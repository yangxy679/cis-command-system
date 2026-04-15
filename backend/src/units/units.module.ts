import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsControllerSimple } from './units.controller.simple';
import { UnitsService } from './units.service';
import { Unit } from './entities/unit.entity';
import { UnitPersonnel } from './entities/unit-personnel.entity';
import { UnitEquipment } from './entities/unit-equipment.entity';
import { DeploymentRecord } from './entities/deployment-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Unit,
      UnitPersonnel,
      UnitEquipment,
      DeploymentRecord,
    ]),
  ],
  controllers: [UnitsControllerSimple],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}
