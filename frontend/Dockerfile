# Utilizamos una imagen base de Node.js
FROM node:18 AS build

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y el package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente de la app
COPY . .

# Creamos la app para producción
RUN npm run build

# Servimos la app usando nginx
FROM nginx:alpine

# Copiamos los archivos generados en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
