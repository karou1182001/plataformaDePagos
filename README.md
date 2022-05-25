# plataformaDePagos

1. Instalar dependencias de Json

2. Instalar Mysql: 
Video tutorial= https://youtu.be/FQ7XAygh0qA
3.Al terminar la instalación al correrlo no les va a hacer la conexión con la base de datoas por la versión de Mysql. Así que tendrán que correr este query en Mysql Worbench
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '112358';

4.En mysql Workbench cuando les pida crear contraseña pongan 112358 para no estar cambiándola
  y deben crear el schema plat_de_pagos 

5. Video base del que nos estamos guiando para hacer el CRUD

6. Para que les pueda correr tiene que abrir dos terminales
En la primera terminal van a entrar a la carpeta frontend con el comando:
cd frontend
Y van a correr:
npm run start
En la segunda terminal van a entrar a la carpeta backend con el comando
cd backend
Y van a correr:
npm run devStart