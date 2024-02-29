import cl from './Products.module.scss';
import { Product } from './Product';
import { useProductsData } from '@/contexts/ProductsContext';
import { GlobalLoader } from '@/components/GlobalLoader';

export const Products = () => {
  const [isLoading, products] = useProductsData();

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className={cl.productsContainer}>
      {products.map((o) => (
        <Product key={o.id} {...o} />
      ))}
    </div>
  );
};
