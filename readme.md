# Auth-Service

Este microservicio maneja la autenticación de usuarios para la aplicación **ColApp**. Permite registrar usuarios, iniciar sesión, obtener el perfil de usuario, y generar tokens JWT para autenticar las solicitudes protegidas.

## Requisitos

- **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Si no lo tienes, puedes descargarlo desde [aquí](https://nodejs.org/).
- **MongoDB**: Este servicio se conecta a una base de datos MongoDB. Asegúrate de tener MongoDB corriendo localmente o en un servidor.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone <repositorio-url>
    cd auth-service
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

    ```env
    MONGO_URI=mongodb://<tu-mongo-uri>
    DB_NAME=ColApp
    JWT_SECRET=<tu-secreto-jwt>
    PORT=5001
    ```

## Estructura del proyecto

auth-service/
├── config/
│   └── db.js                 # Conexión a MongoDB
├── controllers/
│   └── authController.js     # Lógica para el registro y login
├── middlewares/
│   └── validateToken.js      # Middleware para validar JWT
├── models/
│   └── userModel.js          # Estructura de usuario
├── routes/
│   └── authRoutes.js         # Rutas de autenticación
├── utils/
│   └── generateToken.js      # Utilidad para generar JWT
├── index.js                  # Servidor principal del microservicio
├── .env                      # Variables de entorno
└── package.json              # Dependencias del Auth Service


## Rutas disponibles

### 1. **POST /auth/register**
   Registra un nuevo usuario en la base de datos.

   **Body:**
   ```json
   {
     "nombre": "Juan",
     "apellido": "Pérez",
     "email": "juan@example.com",
     "password": "password123",
     "dni": "12345678",
     "cuit": "20-12345678-9",
     "direccion": "Calle Falsa 123",
     "localidad": "Ciudad"
   }
Respuesta:

json
{
  "message": "Usuario registrado con éxito",
  "token": "<jwt-token>"
}
2. POST /auth/login
Inicia sesión con un usuario existente y obtiene un token JWT.

Body:

json
{
  "email": "juan@example.com",
  "password": "password123"
}
Respuesta:

json
{
  "message": "Login exitoso",
  "token": "<jwt-token>"
}
3. GET /auth/profile
Obtiene el perfil del usuario autenticado.

Headers:

json
{
  "Authorization": "Bearer <jwt-token>"
}
Respuesta:

json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "dni": "12345678",
  "cuit": "20-12345678-9",
  "direccion": "Calle Falsa 123",
  "localidad": "Ciudad"
}

Iniciar el servidor
Asegúrate de haber configurado el archivo .env correctamente.

Ejecuta el siguiente comando para iniciar el servidor:

bash
Copiar código
npm start
El servidor se iniciará en el puerto 5001 (o el que hayas configurado en el archivo .env).

Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

Haz un fork de este repositorio.
Crea una rama con tus cambios (git checkout -b feature/nueva-funcionalidad).
Haz commit de tus cambios (git commit -am 'Agrega nueva funcionalidad').
Empuja tus cambios a tu repositorio (git push origin feature/nueva-funcionalidad).
Abre un pull request.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.