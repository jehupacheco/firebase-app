FROM node
RUN mkdir -p app
WORKDIR app
ADD package.json package.json
RUN npm install
RUN npm -g install express-generator