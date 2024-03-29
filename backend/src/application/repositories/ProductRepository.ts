export interface ProductRepository<T=any> {
  getAll(): Promise<T[]>
}