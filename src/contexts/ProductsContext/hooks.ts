import { useContext } from 'react';
import { ProductsContext, productsContext } from './productsContext.ts';

export const useProductsData = () => useContext(productsContext).data;

type UseProductsFiltersReturn = [
  ProductsContext['filters'],
  ProductsContext['setFilters'],
];

export const useProductsFilters = (): UseProductsFiltersReturn => {
  const context = useContext(productsContext);

  return [context.filters, context.setFilters];
};
