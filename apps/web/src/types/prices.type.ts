export interface Price {
  id: string;
  product_id: string;
  unit_amount: number;
  currency: string;
  active: boolean;
  interval: string;
  description?: string;
}
