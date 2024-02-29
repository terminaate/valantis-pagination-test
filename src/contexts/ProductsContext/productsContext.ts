import { createContext } from 'react';
import { UseRequestReturn } from '@/hooks/useRequest.ts';
import { ProductType } from '@/types/ProductType.ts';
import { ProductsFilters } from '@/types/ProductsFilters.ts';

export type ProductsContext = {
  filters: ProductsFilters;
  setFilters: (
    key: keyof ProductsFilters,
    value: ProductsFilters[keyof ProductsFilters],
  ) => void;
  data: UseRequestReturn<ProductType[]>;
};

export const productsContext = createContext<ProductsContext>({
  filters: {
    brand: '',
    price: '',
    product: '',
  },
  setFilters: () => undefined,
  data: [false, [], () => undefined, () => undefined],
});
