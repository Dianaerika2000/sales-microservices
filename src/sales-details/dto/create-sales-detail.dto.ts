import { IsString, IsNumber } from 'class-validator';
export class CreateSalesDetailDto {
  @IsString()
  productId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}