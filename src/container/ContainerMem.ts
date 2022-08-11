import { AppError, httpStatusCodes } from "src/config/error/error";

export class ContainerMemory {
    elements: any[];
    index: number;
    
    constructor() {
        this.elements = [];
        this.index = 0;
    }

    findById = (_id) => {
        _id *= 1;

        const itemIndex = this.#getIndexByFilter({ _id });
        return this.elements[itemIndex];
    };

    findOne = (filter) => {
        const itemIndex = this.#getIndexByFilter(filter);
        return this.elements[itemIndex];
    };

    findAll = () => this.elements;

    save = (elem) => {
        this.index++;

        const newElem = { ...elem, _id: this.index };
        this.elements.push(newElem);

        return newElem;
    };

    findByIdAndUpdate = (_id, elem) => {
        _id *= 1;

        const itemIndex = this.#getIndexByFilter({ _id });
        if (itemIndex === -1)
            throw new AppError("Item not found", httpStatusCodes.NOT_FOUND);

        const newElem = { ...elem, _id };
        this.elements[itemIndex] = newElem
        return newElem;
    };

    findOneAndUpdate = (filter, elem) => {
        const itemIndex = this.#getIndexByFilter(filter);

        if (itemIndex === -1)
            throw new AppError("Item not found", httpStatusCodes.NOT_FOUND);

        this.elements[itemIndex] = elem;
        return elem;
    };

    findByIdAndDelete = (_id) => {
        _id *= 1;

        const itemIndex = this.#getIndexByFilter({ _id });

        if (itemIndex === -1)
            throw new AppError("Item not found", httpStatusCodes.NOT_FOUND);

        this.elements.splice(itemIndex, 1);

        return true;
    };

    findOneAndDelete = (filter) => {
        const itemIndex = this.#getIndexByFilter(filter);

        if (itemIndex === -1)
            throw new AppError("Item not found", httpStatusCodes.NOT_FOUND);

        this.elements.splice(itemIndex, 1);

        return true;
    };

    deleteAll = () => {
        this.elements = [];
        return true;
    };

    #getIndexByFilter = (filter) => {
        return this.elements.findIndex((elem) => {
            return Object.keys(filter).every((key) => {
                return filter[key] === elem[key];
            });
        });
    };
}
