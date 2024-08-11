export interface IProductDB {
  product_id: number;
  product_name: string;
  product_description?: string;
  product_price: number;
  product_stock_qty: number;
  product_thumbnail_url?: string;
}
