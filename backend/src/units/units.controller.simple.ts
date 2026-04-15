import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UnitsService } from './units.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('units')
@UseGuards(JwtAuthGuard)
export class UnitsControllerSimple {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.unitsService.findAllUnits(query);
  }

  @Get('statistics')
  async getStatistics() {
    return this.unitsService.getUnitStatistics();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.unitsService.findUnitById(id);
  }

  @Post()
  async create(@Body() createUnitDto: any) {
    return this.unitsService.createUnit(createUnitDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUnitDto: any) {
    return this.unitsService.updateUnit(id, updateUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unitsService.deleteUnit(id);
  }

  @Get(':id/personnel')
  async getPersonnel(@Param('id') id: string, @Query() query: any) {
    return this.unitsService.getUnitPersonnel(id, query);
  }

  @Get(':id/equipment')
  async getEquipment(@Param('id') id: string, @Query() query: any) {
    return this.unitsService.getUnitEquipment(id, query);
  }

  @Get(':id/deployments')
  async getDeployments(@Param('id') id: string, @Query() query: any) {
    return this.unitsService.getUnitDeployments(id, query);
  }

  @Post(':id/deploy')
  async deployUnit(@Param('id') id: string, @Body() deploymentData: any) {
    return this.unitsService.deployUnit(id, deploymentData);
  }
}
