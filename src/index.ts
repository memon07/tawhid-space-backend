import { env } from '@config/env';
import { connectDatabase } from '@config/sequelize';
import '@models/index';
import { app } from './app';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('Database connection established successfully.');

    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown startup error';
    console.error(`Startup failed: ${message}`);
    process.exit(1);
  }
};

void startServer();
