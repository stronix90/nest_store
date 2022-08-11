import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {ProductService} from './product.service';


@Controller('product')
export class ProductController {
    ProductService: any;

    constructor() {
        this.ProductService = new ProductService()
    }

    @Get()
    findAll(): string {
        return this.ProductService.findAll()
    }

    @Get('/:id')
    findOne(@Param('id') id: string ): string {
        return this.ProductService.findById(id)
    }

    @Post()
    save(@Body() product): string {
        return this.ProductService.save(product)
    }

    @Put('/:id')
    update(@Param('id') id : string, @Body() product): string {
        return this.ProductService.findByIdAndUpdate(id, product)
    }

    @Delete('/:id')
    delete(@Param('id') id : string): string {
        return this.ProductService.findByIdAndDelete(id)
    }



}
