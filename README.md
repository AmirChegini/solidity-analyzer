# solidity-analyzer

Tools: NodeJS, TypeScript
Packages: express, dotenv, nodemon, typescript, http-status, solidity-parser-antlr

For running this project you just need to write "npm install" and then "npm run dev"
The server will run at https://localhost/3001
This application only has one rout: "/analyze"
You just need to send your solidity code as a query parameter called code, the response will includes the imports and contracts

For convenience I did'nt ignore .env file
