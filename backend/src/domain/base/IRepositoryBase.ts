export default interface IRepositoryBase<T> {
  list(): Promise<T[]>;
  getById(id: string): Promise<T>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
