export class CreateOrderDto {
  readonly orderId: string;
  readonly amountA: number;
  readonly amountB: number;
  readonly amountLeft: number;
  readonly tokenA: string;
  readonly tokenB: string;
  readonly user: string;
  readonly isCancelled: boolean = false;
  readonly isFilled: boolean = false;
}
