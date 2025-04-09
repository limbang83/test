import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { SkillLevel } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{9,11}$/, { message: '올바른 휴대폰 번호 형식이 아닙니다.' })
  mobile: string;

  @IsNotEmpty()
  @IsEnum(SkillLevel)
  skill_level: SkillLevel;

  @IsNotEmpty()
  @IsISO8601()
  work_history: string; // ISO 형식 날짜 문자열로 받은 후 서비스에서 Date로 변환

  @IsNotEmpty()
  regions: string[]; // 지역 ID 배열
} 