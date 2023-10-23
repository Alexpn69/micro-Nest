import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './orders/schema/order.schema';
import { Model } from 'mongoose';
import { QueryDto } from './dto/query-dto';
import { MatchDto } from './dto/match-dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async getOrders(
    tokenA: string,
    tokenB: string,
    user: string,
    isCancelled: boolean,
  ): Promise<Order[]> {
    try {
      const query: QueryDto = {
        isCancelled: false,
      };

      if (tokenA) {
        query.tokenA = tokenA;
      }
      if (tokenB) {
        query.tokenB = tokenB;
      }
      if (user) {
        query.user = user;
      }
      if (isCancelled !== undefined) {
        query.isCancelled = isCancelled;
      }
      return await this.orderModel.find(query);
    } catch (error) {
      console.log(error);
    }
  }

  async getMatchingOrders(
    tokenA: string,
    tokenB: string,
    amountA: number,
    amountB: number,
  ): Promise<string[]> {
    try {
      const query = {
        tokenA: tokenA,
        tokenB: tokenB,
        amountA: { $gte: amountA },
        amountB: { $gte: amountB },
      };
      const resp = await this.orderModel.find(query).exec();
      return resp.map((i) => i.orderId);
    } catch (error) {
      console.log(error);
    }
  }
}
