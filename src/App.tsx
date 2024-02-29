import { Products } from 'src/components/Products';
import { ProductsContextProvider } from '@/contexts/ProductsContext';
import { Filters } from '@/components/Filters';
import { Pagination } from '@/components/Pagination';

export const App = () => {
  // @note: Использовать контексты глобально - плохо для производительности
  return (
    <ProductsContextProvider>
      <Filters />
      <Products />
      <Pagination />
    </ProductsContextProvider>
  );
};
