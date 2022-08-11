import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import env from 'src/config/env';
import { ProductService } from '../product/product.service';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    CartService: CartService;
    ProductService: ProductService
    email: string

    constructor() {
        this.CartService = new CartService()
        this.email = env.DEV_USER
        this.ProductService = new ProductService()
    }

    @Get()
    async findAll() : Promise<string>   {
        return await this.CartService.getCart(this.email)
    }

    @Post('/productos/:id_prod')
    async addProductToCart(@Param('id_prod') id_prod: string): Promise<string>   {  
        const product  = await this.ProductService.findById(id_prod)
        return await this.CartService.addProductToCart(this.email, product)
    }

    @Delete('/productos/:id_prod')
    async deleteProductFromCart(@Param('id_prod') id_prod: string): Promise<string>   {  
        return await this.CartService.deleteProductFromCart(this.email, id_prod)
    }
    
    @Delete('/')
    async deleteCart(): Promise<boolean>   {
        return await this.CartService.findOneAndDelete({email: this.email})
    }

}
