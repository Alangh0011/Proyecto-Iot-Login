# CroqueFeed
![Logo de CroqueFeed](./Capturas/logo.jfif)

CroqueFeed es una aplicación web diseñada para monitorear y controlar un dispensador automático de croquetas para mascotas. Esta aplicación proporciona una interfaz intuitiva para que los usuarios puedan verificar el nivel de croquetas, dispensar croquetas manualmente y recibir notificaciones sobre el estado del dispensador.

![Vista del Login](./Capturas/Login.png)
![Vista del Register](./Capturas/Register.png)


## Características

- Ver la cantidad actual de croquetas en el dispensador.
- Dispensar croquetas manualmente.
- Monitorear el nivel de croquetas y recibir alertas de bajo nivel.
- Interfaz fácil de usar y diseño intuitivo.

## Tecnologías Utilizadas

- **Frontend:** React.js, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Base de Datos:** Firebase Realtime Database.
- **Autenticación:** Firebase Authentication.
- **Comunicación en Tiempo Real:** Socket.IO.

![Vista del Home](./Capturas/Home.png)


## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando npm:

```bash
npm install
```
Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias (consulte el archivo .env.example para obtener un ejemplo).
Inicia la aplicación utilizando el comando:

```bash
npm start
```
1. Accede a la aplicación en tu navegador utilizando la URL proporcionada por el servidor.

## Uso

1. Accede a la aplicación en tu navegador utilizando la URL proporcionada por el servidor.
2. Inicia sesión con tu cuenta de usuario o crea una nueva cuenta si es necesario.
3. En la página de inicio, podrás ver el nivel actual de croquetas en el dispensador y controlar el dispensador manualmente.
4. Utiliza la opción "Ver cantidad de croquetas" para obtener información detallada sobre la cantidad actual de croquetas.
5. Utiliza la opción "Abrir compuerta" para dispensar croquetas manualmente.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añade una nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.