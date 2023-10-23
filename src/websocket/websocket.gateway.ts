import { OrdersService } from '../orders/orders.service';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { contractWS } from '../contract/contract.js';

@Injectable()
@WebSocketGateway()
export class WebSocketsGateway {
  constructor(private readonly ordersService: OrdersService) {
    this.initializeWebSocket();
  }

  @WebSocketServer()
  server: Server;

  /*слушем события OrderCreated, OrderCancelled через энд-пойнт от Alchemy
при наступлении которых или записываем новый ордер в БД или меняем статус у имеющегося
метод PUT при событии match в рамках тестового не реализовывал - там все по аналогии

Прослушивание БЧ запускается при старте сервера
*/

  async initializeWebSocket() {
    contractWS.on(
      'OrderCreated',
      (
        id: string,
        amountA: number,
        amountB: number,
        tokenA: string,
        tokenB: string,
        user: string,
        amountLeft = 0,
      ) => {
        const creation = {
          orderId: id.toString(),
          amountA: Number(amountA),
          amountB: Number(amountB),
          tokenA: tokenA.toString(),
          tokenB: tokenB.toString(),
          amountLeft,
          user: user.toString(),
          isCancelled: false,
          isFilled: false,
        };
        console.log('Creation Event:', creation);
        this.ordersService.createOrder(creation);
      },
    );

    contractWS.on('OrderCancelled', (id: string) => {
      const cancelId = {
        orderId: id.toString(),
      };
      console.log('Cancel Event:', cancelId);
      this.ordersService.cancelOrder(cancelId);
    });
  }
}
