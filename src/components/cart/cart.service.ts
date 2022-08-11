import { Injectable } from '@nestjs/common';
import CartDao from './dao/CartDaoMem';

@Injectable()
export class CartService {
  constructor() {
  }

  findOneAndDelete = async (id) => await CartDao.findOneAndDelete(id);

  getCart = async (id) => await CartDao.getCart(id)

  addProductToCart = async (id, elem) =>
    await CartDao.addProductToCart(id, elem)

  deleteProductFromCart = async (id, elem) =>
    await CartDao.deleteProductFromCart(id, elem)
}
