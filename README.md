# plataformaDePagos

1. Instalar dependencias de Json 

2. Para que les pueda correr tiene que abrir dos terminales
En la primera terminal van a entrar a la carpeta frontend con el comando:
cd frontend
Y van a correr:
npm run start
En la segunda terminal van a entrar a la carpeta backend con el comando
cd backend
Y van a correr:
npm run devStart

--------------------------------
Para correr con docker compose

1. Van a descargar docker desktop

2. Abren docker desktop (IMPORTANTE: Si no no los dejará correr los comandos)

3. Van a correr lo siguiente para descargar las imagemes y escalar a dos contenedores
docker-compose up --scale expressapp=2

4. Van a crear una nueva conexión en mysql con el 
hostname= 127.0.0.1
Port= 3307
user= root
password 112358

5. Corren el archivo sql para crear todas las tablas