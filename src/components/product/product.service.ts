import { Injectable } from '@nestjs/common';
import ProductDao from './dao/ProductDaoMem'

@Injectable()
export class ProductService {
    constructor() {
    }

    findById = async (id) => {
        const product = await ProductDao.findById(id);
        return product 
    };

    findAll = async () => {
        const productsList = await ProductDao.findAll();
        return productsList?.map((product) => product);
    };

    save = async (elem) => {
        return await ProductDao.save(elem)
    };

    findByIdAndUpdate = async (id, elem) => {
        const product = await ProductDao.findByIdAndUpdate(id, elem);
        return product
    };

    findByIdAndDelete = async (id) => {
        return ProductDao.findByIdAndDelete(id);
    };
}
