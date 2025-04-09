import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // 전역 파이프 설정 (DTO 검증용)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // API 접두사 설정
  app.setGlobalPrefix('api');
  
  // 포트를 3005로 변경
  const PORT = 3005;
  await app.listen(PORT);
  
  console.log(`백엔드 API 서버가 http://localhost:${PORT}/api 에서 실행 중입니다.`);
}
bootstrap();
