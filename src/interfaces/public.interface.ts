export interface ModuleRes {
  code: string;
  module_name: string;
  slug: string;
  description: string;
  order: number;
  price_monthly: number;
  price_yearly: number;
  discount_monthly: number;
  discount_yearly: number;
  is_active: boolean;
  is_sellable: boolean;
}

export interface CategoryModuleRes {
  code: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  order: number;
  modules: ModuleRes[];
}
