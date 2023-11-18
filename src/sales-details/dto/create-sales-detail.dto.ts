import { IsString, IsNumber } from 'class-validator';
export class CreateSalesDetailDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}