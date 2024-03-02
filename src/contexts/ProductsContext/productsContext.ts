import { createContext, Dispatch, SetStateAction } from 'react';
import { ProductType } from '@/types/ProductType.ts';
import { ProductsFilters } from '@/types/ProductsFilters.ts';

type ProductsLoading = [true, undefined, Dispatch<SetStateAction<undefined>>];

type ProductsDone = [
  false,
  ProductType[],
  Dispatch<SetStateAction<ProductType[]>>,
];

export type ProductsData = ProductsLoading | ProductsDone;

export type ProductsContext = {
  filters: ProductsFilters;
  setFilters: (newState: Partial<ProductsFilters>) => void;
  data: ProductsData;
};

export const productsContext = createContext<ProductsContext>({
  filters: {
    brand: '',
    price: '',
    product: '',
  },
  setFilters: () => undefined,
  data: [false, [], () => undefined],
});
