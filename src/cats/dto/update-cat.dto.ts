import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCatDto extends PartialType(CreateCatDto) {

}
