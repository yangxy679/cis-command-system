import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsControllerSimple } from './statistics.controller.simple';
import { StatisticsServiceSimple } from './statistics.service.simple';
import { Statistics } from './entities/statistics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Statistics]),
  ],
  controllers: [StatisticsControllerSimple],
  providers: [StatisticsServiceSimple],
  exports: [StatisticsServiceSimple],
})
export class StatisticsModule {}
