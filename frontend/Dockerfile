FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias primero
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto por defecto de Vite
EXPOSE 5173

# Inicia el frontend
CMD ["npm", "run", "dev"]
