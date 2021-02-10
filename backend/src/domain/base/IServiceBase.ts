export default interface IServiceBase<T> {
  getById(id: string): Promise<T>;
  list(): Promise<T[]>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
