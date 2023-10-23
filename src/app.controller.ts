import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryDto } from './dto/query-dto';
import { MatchDto } from './dto/match-dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './orders/schema/order.schema';
@ApiTags('Main routes')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getOrders')
  @ApiOperation({
    summary: 'Show orders with required params, all params are optional',
  })
  @ApiQuery({
    name: 'tokenA',
    required: false,
    description: 'You can pass tokenA address',
  })
  @ApiQuery({
    name: 'tokenB',
    required: false,
    description: 'You can pass tokenB address',
  })
  @ApiQuery({
    name: 'user',
    required: false,
    description: 'You can pass users address',
  })
  @ApiQuery({
    name: 'isCancelled',
    required: false,
    description:
      'You can pass isCancelled=true and you will get all cancelled orders, by default func returns only active orders',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Order] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getOrders(@Query() query: QueryDto) {
    try {
      const { tokenA, tokenB, user, isCancelled } = query;
      return await this.appService.getOrders(tokenA, tokenB, user, isCancelled);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/getMatchingOrders')
  @ApiOperation({
    summary:
      'Will return array of order Ids that meet the conditions, all params are necessary',
  })
  @ApiQuery({
    name: 'tokenA',
    required: true,
    description: 'You have to pass tokenA address',
  })
  @ApiQuery({
    name: 'tokenB',
    required: true,
    description: 'You hsve to pass tokenB address',
  })
  @ApiQuery({
    name: 'amountA',
    required: true,
    description: 'You have to pass amount of token A',
  })
  @ApiQuery({
    name: 'amountB',
    required: true,
    description: 'You have to pass amount of token B',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [String],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getMatchingOrders(@Query() query: MatchDto) {
    try {
      const { tokenA, tokenB, amountA, amountB } = query;
      return await this.appService.getMatchingOrders(
        tokenA,
        tokenB,
        amountA,
        amountB,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
