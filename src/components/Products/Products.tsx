import cl from './Products.module.scss';
import { ProductsService } from '@/services/ProductsService.ts';
import { useRequest } from '@/hooks/useRequest.ts';
import { ProductType } from '@/types/ProductType.ts';
import { Product } from '../Product';

export const Products = () => {
  const [isLoading, products, reFetchProducts] = useRequest<ProductType[]>(() =>
    ProductsService.getProducts(),
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={cl.productsContainer}>
      {products.map((o) => (
        <Product key={o.id} {...o} />
      ))}
    </div>
  );
};
