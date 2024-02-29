import { ProductType } from '@/types/ProductType.ts';
import cl from './Product.module.scss';
import { FC } from 'react';
import { formatPrice } from '@/utils/formatPrice.ts';

export const Product: FC<ProductType> = ({
  product: productName,
  id,
  price,
  brand,
}) => {
  // TODO: сделать красивее стили)

  return (
    <div className={cl.productContainer}>
      <div className={cl.titleContainer}>
        <h4 className={cl.productName}>{productName}</h4>
        <span className={cl.id}>{id}</span>
      </div>
      <span>{String(brand)}</span>
      <span>{formatPrice(price, '.')}</span>
    </div>
  );
};
