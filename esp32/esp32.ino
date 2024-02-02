/**
 * ESP32.ino: Código para controlar un ESP32 con sensores y actuadores.
 * Este código se encarga de controlar un servo motor, un motor paso a paso
 * y un sensor ultrasónico HC-SR04. Además, establece una conexión WiFi y
 * gestiona las solicitudes HTTP para obtener datos de los sensores.
 */

#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Stepper.h>
#include <ESP32Servo.h>

// Variables globales para controlar el estado de la conexión y los dispositivos
int counterConnection = 0;
bool distanciaEnable = true;
bool motorEnable = true;

// Pines para el sensor ultrasónico HC-SR04
const int trigPin = 2;
const int echoPin = 15;

Servo miServo;
Servo miServo2; // Segundo servo

const int pinServo = 4;  // Pin GPIO del primer servo
const int pinServo2 = 5; // Pin GPIO del segundo servo

unsigned long lastReadTime = 0;
const unsigned long readInterval = 2000; // Intervalo de lectura de sensores (2 segundos)

const int stepsPerRevolution = 500;
Stepper myStepper(stepsPerRevolution, 18, 19, 12, 13); // Motor paso a paso

float distance; // Variable global para almacenar la distancia medida

unsigned long previousMillis = 0;
const long interval = 1000; // Intervalo para actualización (1 segundo)

const char *ssid = "TotalplayLH_2.4Gnormal";
const char *password = "65028912Lg";

WiFiServer server(8080);
WiFiClient client;
String serverAddress = "http://192.168.0.6:8080/";
String request;

void setup() {
  // Configuración inicial
  myStepper.setSpeed(12);
  miServo.attach(pinServo);
  miServo2.attach(pinServo2);
  Serial.begin(9600);

  // Conexión a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED && counterConnection < 10) {
    delay(500);
    Serial.print(".");
    counterConnection++;
  }

  // Si se conecta correctamente, configura la IP y el servidor
  if (counterConnection < 10) {
    IPAddress ip(192, 168, 100, 5);
    IPAddress gateway(192, 168, 100, 1);
    IPAddress subnet(255, 255, 255, 0);
    WiFi.config(ip, gateway, subnet);
    Serial.println("");
    Serial.println("Conectado al WiFi");
    server.begin();
    Serial.print("API ESP32 desplegado en la ip 'http://");
    Serial.print(WiFi.localIP());
    Serial.println(":8080'");
  } else {
    Serial.println("");
  }

  delay(2500);
}

void loop() {
  // Manejo de las solicitudes web
  int result = handleWebRequests();
}

// Función para leer la distancia del sensor ultrasónico HC-SR04
float readDistance() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  distance = duration / 58.2; // Convertir a centímetros

  Serial.println("Distancia del sensor: " + String(distance) + " cm");
  return distance;
}

// Función para abrir la compuerta utilizando el motor paso a paso y los servos
int abrirCompuerta() {
  int stepsToMove = (180.0 / 360.0) * stepsPerRevolution;

  miServo.write(90);
  miServo2.write(180);
  delay(1000);

  myStepper.step(-stepsToMove);
  Serial.println("Regresando el motor a la posición inicial");

  miServo.write(180);
  miServo2.write(90);
  delay(1000);

  return stepsToMove;
}

// Función para manejar las solicitudes HTTP
int handleWebRequests() {
  client = server.available();

  if (!client)
    return 0;

  Serial.println("Nuevo cliente");
  String buffer = "";
  while (client.connected()) {
    if (client.available()) {
      request = client.readStringUntil('\r');

      if (request.indexOf("GET /getDistance") != -1) {
        if (distanciaEnable)
          sendHTTPResponse(String(readDistance()));
        else
          sendHTTPResponse("Not Enable");
      } else if (request.indexOf("GET /getGirar") != -1) {
        if (motorEnable)
          sendHTTPResponse("Girar: " + String(abrirCompuerta()));
        else
          sendHTTPResponse("Not Enable");
      } else if (request.indexOf("GET /distance") != -1) {
        buffer = (distanciaEnable) ? "habilitada." : "deshabilitada.";
        sendHTTPResponse("Senseo de temperatura " + buffer);
      } else {
        sendHTTPResponse("Comando GET no reconocido");
        return 0;
      }

      client.flush();
      delay(100);
      break;
    }
  }

  client.stop();

  return 1;
}

// Función para enviar la respuesta HTTP al cliente
void sendHTTPResponse(String content) {
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");
  client.println();
  client.println(content);
  client.println();
}
