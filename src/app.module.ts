import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { OrderSchema } from './orders/schema/order.schema';
import { WebSocketsGateway } from './websocket/websocket.gateway';
import { InitialDataService } from './initial-data/initial-data.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URL),
    OrdersModule,
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketsGateway, InitialDataService],
})
export class AppModule {}
