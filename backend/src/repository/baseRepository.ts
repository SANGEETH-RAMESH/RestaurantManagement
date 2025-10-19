import { Model, Document } from "mongoose";
import { IBaseRepository } from "../interface/base/IBaseRepository";

export class BaseRepository<T extends Document>  implements IBaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T | string> {
    try {
      const newDoc = await this.model.create(data);
      return newDoc;
    } catch (error) {
      return (error as Error).message;
    }
  }

  async findAll(filter: object = {}): Promise<T[] | string> {
    try {
      return await this.model.find(filter);
    } catch (error) {
      return (error as Error).message;
    }
  }

  async findById(id: string): Promise<T | null | string> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      return (error as Error).message;
    }
  }

  async findOne(filter: object): Promise<T | null | string> {
    try {
      return await this.model.findOne(filter);
    } catch (error) {
      return (error as Error).message;
    }
  }

  async update(id: string, data: Partial<T>): Promise<string> {
    try {
      await this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
      return "Updated successfully";
    } catch (error) {
      return (error as Error).message;
    }
  }

  async delete(id: string): Promise<string> {
    try {
      await this.model.findByIdAndDelete(id);
      return "Deleted successfully";
    } catch (error) {
      return (error as Error).message;
    }
  }
}
