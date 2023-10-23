import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class Order {
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Prop()
  orderId: string;
  @ApiProperty({ example: '333', description: 'amount of token A' })
  @Prop()
  amountA: number;
  @ApiProperty({ example: '444', description: 'amount of token B' })
  @Prop()
  amountB: number;
  @ApiProperty({
    example: '222',
    description: 'difference between amount A and fullfilled state',
  })
  @Prop()
  amountLeft: number;
  @ApiProperty({
    example: '0x111...a0',
    description: 'address of token A contract',
  })
  @Prop()
  tokenA: string;
  @ApiProperty({
    example: '0x222...a0',
    description: 'address of token B contract',
  })
  @Prop()
  tokenB: string;
  @ApiProperty({ example: '0x333...a0', description: 'address of user' })
  @Prop()
  user: string;
  @ApiProperty({
    example: 'false',
    description: 'Shows state of order - cancelled or not',
  })
  @Prop()
  isCancelled: boolean;
  @ApiProperty({
    example: 'false',
    description: 'Shows state of fullfilled of order',
  })
  @Prop()
  isFilled: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
