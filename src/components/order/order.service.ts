import { Injectable } from '@nestjs/common';
import OrderDao from './dao/OrderDaoMem';

@Injectable()
export class OrderService {

    constructor() {
    }

    save = async (elem) => {
        const order = await OrderDao.save(elem);
        return order
    };

    getOrders = async (email) => {
        const orders = await OrderDao.findOne({email});
        return orders;
    }
}
