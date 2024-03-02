import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ProductType } from '@/types/ProductType.ts';
import { ProductsService } from '@/services/ProductsService.ts';
import { ProductsContext, productsContext } from './productsContext';
import { ProductsFilters } from '@/types/ProductsFilters.ts';
import { useDebounce } from 'use-debounce';

export const ProductsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFiltersState] = useState<ProductsFilters>({
    brand: '',
    price: '',
    product: '',
  });
  const [debouncedFilters] = useDebounce(filters, 1000);

  const fetchProducts = async () => {
    setIsLoading(true);

    const responseProducts = await ProductsService.getProducts();
    setProducts(responseProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchFilters = async (params: Partial<ProductsFilters>) => {
    setIsLoading(true);

    const responseProducts = await ProductsService.getFilteredProducts(params);
    console.log('filters response', responseProducts);
    setProducts(responseProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    if (Object.values(debouncedFilters).every((o) => !o)) {
      console.log('filters empty');

      fetchProducts();
      return;
    }

    console.log('fetching filters');

    const filtered = Object.entries(debouncedFilters)
      .filter((o) => o[1])
      .reduce<Partial<ProductsFilters>>((acc, [key, value]) => {
        acc[key as keyof ProductsFilters] = value;
        return acc;
      }, {});

    fetchFilters(filtered);
  }, [debouncedFilters]);

  const setFilters = (newState: Partial<ProductsFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <productsContext.Provider
      value={{
        filters,
        setFilters,
        data: [isLoading, products, setProducts] as ProductsContext['data'],
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
