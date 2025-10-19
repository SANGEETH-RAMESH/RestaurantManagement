export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T | string>;
  findAll(filter?: object): Promise<T[] | string>;
  findById(id: string): Promise<T | null | string>;
  findOne(filter: object): Promise<T | null | string>;
  update(id: string, data: Partial<T>): Promise<string>;
  delete(id: string): Promise<string>;
}
