import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('회원가입 요청:', registerDto);
    
    // 지역 이름 목록일 경우 처리
    if (registerDto.regions && registerDto.regions.length > 0) {
      if (typeof registerDto.regions[0] === 'string' && registerDto.regions[0].length > 36) {
        // 이미 ID라면 그대로 사용
        console.log('지역 ID 사용:', registerDto.regions);
      } else {
        // 지역 이름 → ID 변환
        try {
          const regionIds = [];
          for (const regionName of registerDto.regions) {
            const region = await this.prisma.region.findFirst({
              where: { name: regionName }
            });
            if (region) {
              regionIds.push(region.id);
            }
          }
          
          if (regionIds.length > 0) {
            registerDto.regions = regionIds;
            console.log('변환된 지역 ID:', regionIds);
          } else {
            // 지역을 찾지 못한 경우 기본 지역(서울) 사용
            const defaultRegion = await this.prisma.region.findFirst({
              where: { name: '서울' }
            });
            registerDto.regions = defaultRegion ? [defaultRegion.id] : [];
          }
        } catch (error) {
          console.error('지역 변환 오류:', error);
          // 오류 발생 시 기본 지역(서울) 사용
          const defaultRegion = await this.prisma.region.findFirst({
            where: { name: '서울' }
          });
          registerDto.regions = defaultRegion ? [defaultRegion.id] : [];
        }
      }
    } else {
      // 지역이 없는 경우 기본 지역(서울) 사용
      const defaultRegion = await this.prisma.region.findFirst({
        where: { name: '서울' }
      });
      registerDto.regions = defaultRegion ? [defaultRegion.id] : [];
    }

    const user = await this.usersService.create(registerDto);
    
    return {
      message: '회원가입이 완료되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @CurrentUser() user: any) {
    return this.authService.login(loginDto);
  }
} 