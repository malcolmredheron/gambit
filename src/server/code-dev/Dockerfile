FROM node:14

WORKDIR /gambit
COPY package.json package-lock.json /gambit/
RUN npm install
COPY tailwind.config.js tsconfig.json .babelrc.json /gambit/
COPY src /gambit/src

CMD ["npx", "parcel", "--port=80", "--no-autoinstall", "--hmr-port=81", "src/app/App.html"]
