import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginationResult } from '../common/interfaces/pagination.interface';
import { UserResponseDto, UserWithRegions } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, currentUserId?: string): Promise<UserResponseDto> {
    const { regions, password, work_history, ...userData } = createUserDto;
    
    // 비밀번호 해싱
    const hashedPassword = await this.hashPassword(password);
    
    // 전화번호에서 하이픈 제거
    const formattedMobile = userData.mobile.replace(/-/g, '');
    
    // 트랜잭션으로 사용자와 지역 정보를 함께 생성
    const user = await this.prisma.$transaction(async (prisma) => {
      // 사용자 생성
      const createdUser = await prisma.user.create({
        data: {
          ...userData,
          mobile: formattedMobile,
          password: hashedPassword,
          work_history: new Date(work_history),
          created_id: currentUserId,
        },
      });

      // 지역 연결
      if (regions && regions.length > 0) {
        try {
          await Promise.all(
            regions.map((regionId) =>
              prisma.userRegion.create({
                data: {
                  user_id: createdUser.id,
                  region_id: regionId,
                },
              })
            )
          );
        } catch (error) {
          console.error('지역 연결 오류:', error);
          // 지역 연결에 실패해도 사용자 생성은 계속 진행
        }
      }

      return createdUser;
    });

    // 생성된 사용자 정보와 지역 정보를 조회
    return await this.findOne(user.id);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<UserResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        where: { enabled: true },
        include: {
          userRegions: {
            include: {
              region: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({ where: { enabled: true } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    
    return {
      items: users.map(user => new UserResponseDto(user as UserWithRegions)),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id, enabled: true },
      include: {
        userRegions: {
          include: {
            region: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new UserResponseDto(user as UserWithRegions);
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, enabled: true },
      include: {
        userRegions: {
          include: {
            region: true,
          },
        },
      },
    });
  }

  async findByMobile(mobile: string) {
    // 하이픈 제거
    const formattedMobile = mobile.replace(/-/g, '');
    
    return this.prisma.user.findUnique({
      where: { mobile: formattedMobile, enabled: true },
      include: {
        userRegions: {
          include: {
            region: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUserId: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id, enabled: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { regions, password, work_history, mobile, ...userData } = updateUserDto;
    
    // 업데이트할 데이터 준비
    const updateData: any = {
      ...userData,
      updated_id: currentUserId,
    };
    
    // 비밀번호가 제공되면 해싱
    if (password) {
      updateData.password = await this.hashPassword(password);
    }
    
    // 전화번호가 제공되면 하이픈 제거
    if (mobile) {
      updateData.mobile = mobile.replace(/-/g, '');
    }
    
    // 경력 시작일이 제공되면 Date 객체로 변환
    if (work_history) {
      updateData.work_history = new Date(work_history);
    }
    
    // 트랜잭션으로 사용자와 지역 정보를 함께 업데이트
    await this.prisma.$transaction(async (prisma) => {
      // 사용자 정보 업데이트
      await prisma.user.update({
        where: { id },
        data: updateData,
      });

      // 지역 정보 업데이트
      if (regions) {
        // 기존 지역 연결 삭제
        await prisma.userRegion.deleteMany({
          where: { user_id: id },
        });

        // 새 지역 연결 생성
        if (regions.length > 0) {
          await Promise.all(
            regions.map((regionId) =>
              prisma.userRegion.create({
                data: {
                  user_id: id,
                  region_id: regionId,
                },
              })
            )
          );
        }
      }
    });

    // 업데이트된 사용자 정보 조회
    return await this.findOne(id);
  }

  async remove(id: string, currentUserId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id, enabled: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // 논리적 삭제 (enabled = false)
    await this.prisma.user.update({
      where: { id },
      data: {
        enabled: false,
        updated_id: currentUserId,
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
} 