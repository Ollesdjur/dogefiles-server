FROM node:14    
RUN mkdir -p /src/user/app  
WORKDIR /src/user/app  
COPY package*.json ./    
COPY . .      
EXPOSE 3000     
RUN npm install 
CMD ["node", "server.js"]  