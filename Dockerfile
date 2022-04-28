FROM node:14-alpine
ARG HOLA="Hola, usamos ARG..."
ENV START=${HOLA}
RUN echo "Estamos usando ${START}"
RUN mkdir /my_app
COPY package.json /my_app
WORKDIR /my_app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm" , "start"]
