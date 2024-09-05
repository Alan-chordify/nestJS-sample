import { ApiProperty } from "@nestjs/swagger";

export class deleteCatDto {
  @ApiProperty({ description: 'ID of the record to be deleted' })
  id: string
  }