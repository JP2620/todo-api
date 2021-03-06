import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(
    session({
      secret: 'SECRETSHHHH',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000, //10 mins,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const PORT = process.env.PORT || 5001;
  console.log(`Listening on port ${PORT}`);
  await app.listen(5001 || process.env.Port);
}
bootstrap();
