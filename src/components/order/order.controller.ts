import { Body, Controller, Get, Post } from '@nestjs/common';
import env from 'src/config/env';
import { AppError, httpStatusCodes } from 'src/config/error/error';
import { CartService } from '../cart/cart.service';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  OrderService: any;
  email: string;
  CartService: CartService;

  constructor() {
    this.OrderService = new OrderService();
    this.CartService = new CartService();
    this.email = env.DEV_USER;
  }

  @Get()
  async getOrders(): Promise<object> {
    const orders = await this.OrderService.getOrders(this.email);
    return orders;
  }

  @Post()
  async save(
    @Body() body: { deliveryAddress: string; deliveryDate: string },
  ): Promise<object> {
    const { deliveryAddress, deliveryDate } = body;

    const cart = await this.CartService.getCart(this.email);

    const order = {
      email: this.email,
      products: cart.products,
      deliveryAddress,
      deliveryDate,
      total: cart.total,
    };

    try {
      const savedOrder: { _id: string } = await this.OrderService.save(order);

      await this.CartService.findOneAndDelete({ email: this.email });

      return { _id: savedOrder._id };
    } catch (error) {
      throw new AppError(
        'Error creating order',
        httpStatusCodes.INTERNAL_SERVER,
      );
    }
  }
}
