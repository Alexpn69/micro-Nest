import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderModel.create(orderDto);
    } catch (error) {
      console.log(error);
    }
  }

  async cancelOrder(orderDto: CancelOrderDto): Promise<void> {
    try {
      const order = await this.orderModel.findOne({
        orderId: orderDto.orderId,
      });
      order.isCancelled = true;
      await order.save();
    } catch (error) {
      console.log(error);
    }
  }
}
