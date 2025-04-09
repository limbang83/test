import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginationResult } from '../common/interfaces/pagination.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResult<UserResponseDto>> {
    return this.usersService.findAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User
  ): Promise<void> {
    return this.usersService.remove(id, user.id);
  }

  @Get('check-email')
  async checkEmailDuplicate(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    return { exists: !!user };
  }
} 