import cl from './Filters.module.scss';
import { Input } from '@/components/UI/Input/Input.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { useProductsFilters } from '@/contexts/ProductsContext';

export const Filters = () => {
  const [filters, setFilters] = useProductsFilters();

  // const [name, setName] = useState('');
  // const debouncedName = useDebounce(name, 1000);
  // const [filters, setFilters] = useProductsFilters();
  //
  // const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };
  //
  // useEffect(() => {}, [debouncedName]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ product: e.target.value });
  };

  return (
    <div className={cl.filtersContainer}>
      <Input
        value={filters.product}
        onChange={onNameChange}
        className={cl.productNameInput}
        placeholder={'Name'}
      />
      {/*<Input value={price} onChange={onPriceChange} placeholder={'Price'} />*/}
      {/*<Input value={brand} onChange={onBrandChange} placeholder={'Brand'} />*/}
    </div>
  );
};
