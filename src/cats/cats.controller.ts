import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('cats')
@UseGuards(JwtAuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOperation({ summary: 'Lists all cats' })
  @ApiResponse({ status: 200, description: 'Cats will be displayed' })
  findAll() {
    console.log("controller")
    return this.catsService.findAll();
  }

  @ApiOperation({ summary: 'Create New Cat' })
  @ApiResponse({ status: 201, description: 'Cat will be Created'})
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Find one Cat' })
  @ApiResponse({ status: 200, description: 'The cat with matching ID will be returned'})
  @ApiResponse({ status: 404, description: 'Cat not found'})
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edits one cat' })
  @ApiResponse({ status: 200, description: 'Updated Details of the cat with matching id will be returned'})
  @ApiResponse({ status: 404, description: 'Cat not found'})
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'deletes one cat' })
  @ApiResponse({ status: 200, description: 'Deletes record of the matching cat'})
  @ApiResponse({ status: 404, description: 'Cat not found'})
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
