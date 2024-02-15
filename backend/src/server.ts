import { config } from 'dotenv';
config()
import app from "./app";
import { sequelize } from './config/database';


const port = process.env.PORT || 8000;

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1)
})

sequelize.sync({ force: false }).then(() => {
  console.log('Database Synced');
}
).catch((err) => {
  console.log(err);
})

const server = app.listen(port, () => {
  console.log(`Server is listening at PORT: ${port}`);
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err: any) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1)
  })
})
