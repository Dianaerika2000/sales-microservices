import { IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  total: number;
  @IsNumber()
  discount: number;

  @IsNumber()
  customerId: number;
}
