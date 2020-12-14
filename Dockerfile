# What image do you want to start building on?
FROM node:latest

# Make a folder in your image where your app's source code can live
RUN mkdir -p /checkout-service

# Tell your container where your app's source code will live
WORKDIR /checkout-service

# What source code do you want to copy, and where to put it?
COPY . /checkout-service

# Does your app have any dependencies that should be installed?
RUN npm install

# What port will the container talk to the outside world with once created?
EXPOSE 3000

# How do you start your app?
CMD [ "npm", "start" ]