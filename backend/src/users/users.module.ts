import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersControllerSimple } from './users.controller.simple';
import { UsersServiceSimple } from './users.service.simple';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersControllerSimple],
  providers: [UsersServiceSimple],
  exports: [UsersServiceSimple],
})
export class UsersModule {}
