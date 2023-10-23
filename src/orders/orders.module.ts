import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schema/order.schema';

@Module({
  providers: [OrdersService],
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
