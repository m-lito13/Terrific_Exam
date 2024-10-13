FROM node
WORKDIR /app_be/dist
COPY package.json /app_be
RUN npm install
COPY . /app_be
CMD ["node","index.js"]