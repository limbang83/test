import { IsEmail, IsEnum, IsISO8601, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { SkillLevel } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{9,11}$/, { message: '올바른 휴대폰 번호 형식이 아닙니다.' })
  mobile?: string;

  @IsOptional()
  @IsEnum(SkillLevel)
  skill_level?: SkillLevel;

  @IsOptional()
  @IsISO8601()
  work_history?: string; // ISO 형식 날짜 문자열로 받은 후 서비스에서 Date로 변환

  @IsOptional()
  regions?: string[]; // 지역 ID 배열
} 