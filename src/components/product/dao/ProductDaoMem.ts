import { ContainerMemory } from "src/container/ContainerMem";

class ProductConstructor extends ContainerMemory {
    constructor() {
        super();
    }

    findByIdForCart = async (id) => {
        const product = await this.findById(id);

        if (!product) return null;

        delete product.description;
        delete product.stock;
        delete product.thumbnail;

        return product;
    };
}

export default new ProductConstructor ()