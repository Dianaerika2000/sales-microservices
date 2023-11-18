import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

class salesDetailDto {
  @IsNumber()
  productId: number;
  
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
