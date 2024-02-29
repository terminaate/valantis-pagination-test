import { FC, PropsWithChildren, useState } from 'react';
import { useRequest } from '@/hooks/useRequest.ts';
import { ProductType } from '@/types/ProductType.ts';
import { ProductsService } from '@/services/ProductsService.ts';
import { productsContext } from './productsContext';
import { ProductsFilters } from '@/types/ProductsFilters.ts';

export const ProductsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const data = useRequest<ProductType[]>(() => ProductsService.getProducts());
  const [isLoading, products, reFetch, setProducts] = data;

  const [filters, setFiltersState] = useState<ProductsFilters>({
    brand: '',
    price: '',
    product: '',
  });

  const setFilters = (
    key: keyof ProductsFilters,
    value: ProductsFilters[keyof ProductsFilters],
  ) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <productsContext.Provider value={{ filters, setFilters, data }}>
      {children}
    </productsContext.Provider>
  );
};
