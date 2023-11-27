import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class salesDetailDto {
  @IsString()
  productId: string;
  
  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}

export class SaleDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  total: number;
  
  @IsNumber()
  discount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => salesDetailDto)
  details: salesDetailDto[];
}
