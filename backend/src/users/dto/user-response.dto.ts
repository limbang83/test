import { SkillLevel, User, UserRegion } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

// 지역 정보를 포함한 사용자 타입
export type UserWithRegions = User & {
  userRegions: (UserRegion & {
    region: { id: string; name: string };
  })[];
};

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  
  @Transform(({ value }) => {
    // 전화번호에 하이픈 추가
    if (value.length === 10) {
      return `${value.substring(0, 3)}-${value.substring(3, 6)}-${value.substring(6)}`;
    } else if (value.length === 11) {
      return `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7)}`;
    }
    return value;
  })
  mobile: string;
  
  skill_level: SkillLevel;
  work_history: Date;
  
  @Expose({ name: 'regions' })
  @Transform(({ obj }) => {
    return obj.userRegions?.map(ur => ({
      id: ur.region.id,
      name: ur.region.name
    })) || [];
  })
  regions: { id: string; name: string }[];
  
  @Exclude()
  userRegions: any[];
  
  @Exclude()
  password: string;
  
  created_at: Date;
  updated_at: Date | null;
  
  constructor(partial: Partial<UserWithRegions>) {
    Object.assign(this, partial);
  }
} 