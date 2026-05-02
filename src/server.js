import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`API running at ${env.baseUrl}`);
    console.log(`Swagger available at ${env.baseUrl}/api-docs`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API:', error.message);
  process.exit(1);
});

export default app;
