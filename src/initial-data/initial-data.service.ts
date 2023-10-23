import { OrdersService } from './../orders/orders.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { Order } from 'src/orders/schema/order.schema';
import { contract } from '../contract/contract.js';

@Injectable()
export class InitialDataService implements OnApplicationBootstrap {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
    private readonly ordersService: OrdersService,
  ) {}
  async getNUmbersOfRecordsInDB(): Promise<number> {
    try {
      const res = await this.orderModel.find();
      return res.length;
    } catch (error) {
      console.log(error);
    }
  }

  async getNumberOfOrders(): Promise<number> {
    try {
      return ethers.toNumber(await contract.getOrderIdLength());
    } catch (error) {
      console.log(error);
    }
  }
  /*Здесь мы получаем инфо о каждом ордере с контракта по его ИД
  и пишем в БД, при последующем обновлении сравниваем кол-во записей в БД и кол-во
  ордеров на контракте и пишем в БД только новые ордера
  Также надо обновлять статусы по isCancelled & isFilled полям - проводить сравнение
  по ним, в рамках тестового этого не делал
  Реализованный подход имеет свой минус - скорость обработки,
  если учесть что на контракте сотни тысяч ордеров то быстрее сделать по считыванию
  инфо из журналов Ивентов, сопоставлению данных по ним и потом запись в БД

  Эта функция будет запускаться каждый раз при перезапуске сервера
  */
  async onApplicationBootstrap(): Promise<void> {
    try {
      const numberOfRecordsInDB = await this.getNUmbersOfRecordsInDB();
      const numberOfOrders = await this.getNumberOfOrders();
      console.log(numberOfOrders, numberOfRecordsInDB);
      const count = numberOfOrders - numberOfRecordsInDB;
      if (count > 0)
        for (let index = numberOfRecordsInDB; index < numberOfOrders; index++) {
          const orderId = await contract.getOrderId(index);
          const order = await contract.getOrderInfo(orderId);
          await this.ordersService.createOrder({
            orderId: order[0].toString(),
            amountA: Number(order[1]),
            amountB: Number(order[2]),
            amountLeft: Number(order[4]),
            tokenA: order[5].toString(),
            tokenB: order[6].toString(),
            user: order[7].toString(),
            isCancelled: order[8],
            isFilled: Number(order[1]) <= Number(order[4]) ? true : false,
          });
        }
    } catch (error) {
      console.log(error);
    }
  }
}
