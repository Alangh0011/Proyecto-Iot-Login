#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Stepper.h>
#include <ESP32Servo.h>

int counterConnection = 0;
bool distanciaEnable = true;
bool motorEnable = true;

// Definiciones para el sensor ultrasónico HC-SR04
const int trigPin = 2;
const int echoPin = 15;

Servo miServo;
Servo miServo2; // Segundo servo

const int pinServo = 4; // Pin GPIO al que está conectado el servo
const int pinServo2 = 5; // Pin GPIO al que está conectado el segundo servo
//Pin 5 es el que va en la derecha
//pin 4 es el que va a la izquierda

unsigned long lastReadTime = 0;
const unsigned long readInterval = 2000; // Lectura de sensores cada 2000 milisegundos (2 segundos)

const int stepsPerRevolution = 500;
Stepper myStepper(stepsPerRevolution, 18, 19, 12, 13);  // Usando D35 (GPIO35) como TRIG y D34 (GPIO34) como ECHO

float distance;  // Declarar la variable a nivel global


unsigned long previousMillis = 0;
const long interval = 1000;  // Actualiza cada 1 segundo

const char* ssid = "TP-Link_BCCE";
const char* password = "56826449";

WiFiServer server(8080);
WiFiClient client;
String serverAddress = "http://192.168.0.6:8080/";

String request;

void setup() {

  myStepper.setSpeed(12);  // Velocidad del motor en rpm
  miServo.attach(pinServo);
  miServo2.attach(pinServo2);
  Serial.begin(9600);

/********************* CONEXIÓN A UNA RED WIFI ***********************/
  WiFi.begin(ssid,password);

  while (WiFi.status() != WL_CONNECTED && counterConnection < 10) {
    delay(500);
    Serial.print(".");
    counterConnection++;
  }

  if (counterConnection < 10) {
    IPAddress ip(192,168,0,5);
    IPAddress gateway(192,168,0,1);
    IPAddress subnet(255,255,255,0);
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
/**********************************************************************/


  delay(2500);
}

void loop() {
  int result = handleWebRequests();
/*
  unsigned long currentTime = millis();

  if (currentTime - lastReadTime >= readInterval) {
    
    if (distanciaEnable) float distanciaValue = readDistance();

    if (motorEnable) int motorValue = abrirCompuerta();

    lastReadTime = currentTime;
  }
*/
  
}
// Función para leer la distancia del sensor HCSR-04
float readDistance() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Medir la distancia con el sensor ultrasónico
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

int abrirCompuerta() {
  int stepsToMove = (180.0 / 360.0) * stepsPerRevolution; // Gira 180 grados
  
  miServo.write(90);  // Mueve el servo a 90 grados
  miServo2.write(180); // Mueve el servo a 180 grados
  delay(1000); // Pausa de 1 segundo para esperar que la compuerta se abra

  myStepper.step(-stepsToMove); // Regresa a la posición inicial
  Serial.println("Regresando el motor a la posición inicial");

  miServo.write(180); // Mueve el servo a 180 grados
  miServo2.write(90); // Mueve el servo a 180 grados
  delay(1000);      // Espera 1 segundo
  return stepsToMove;
}

int handleWebRequests() {
  client = server.available();

  if (!client) return 0;

  Serial.println("Nuevo cliente");
  String buffer = "";
  while (client.connected()) {
    if (client.available()) {
      request = client.readStringUntil('\r');

      if (request.indexOf("GET /getDistance") != -1) {
        if (distanciaEnable) sendHTTPResponse(String(readDistance()));
        else sendHTTPResponse("Not Enable");
      }
      
      else if (request.indexOf("GET /getGirar") != -1) {
        if (motorEnable) sendHTTPResponse("Girar: " + String(abrirCompuerta()));
        else sendHTTPResponse("Not Enable");
      }
      else if (request.indexOf("GET /distance") != -1) {
        buffer = (distanciaEnable) ? "habilitada." : "deshabilitada.";
        sendHTTPResponse("Senseo de temperatura " + buffer);
      }      
      else {
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

// UNUSED
String formatDistanceData(float value) {
  return "distance=" + String(value);
}

// UNUSED
int sendSensorsData(String &data) {
  if (WiFi.status() != WL_CONNECTED)
    WiFi.begin(ssid, password);

  HTTPClient http;

  http.begin(serverAddress);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpResponseCode = http.POST(data);
  http.end();

  return httpResponseCode > 0;
}

void sendHTTPResponse(String content) {
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");
  client.println();
  client.println(content);
  client.println();
}


