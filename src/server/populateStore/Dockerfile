FROM node:14

WORKDIR /gambit
COPY package.json package-lock.json /gambit/
RUN npm install
COPY tsconfig.json /gambit/
COPY src /gambit/src

CMD ["npx", "ts-node", "src/server/populateStore/PopulateStore.ts"]
