import { HttpService } from '@/services/HttpService.ts';
import { getUniqueArrayByField } from '@/utils/getUniqueArrayByField.ts';
import { ProductType } from '@/types/ProductType.ts';
import { ProductsFilters } from '@/types/ProductsFilters.ts';

export class ProductsService {
  private static readonly DEFAULT_LIMIT = 50;

  private static async fetchItemsByIds(ids: string[]) {
    const items = await HttpService.request<ProductType[]>('get_items', {
      ids: [...new Set(ids)],
    });

    return getUniqueArrayByField(items, 'id');
  }

  public static async getProducts(
    offset = 0,
    limit = this.DEFAULT_LIMIT,
  ): Promise<ProductType[]> {
    const ids = await HttpService.request<string[]>('get_ids', {
      offset,
      limit,
    });

    return this.fetchItemsByIds(ids);
  }

  public static async getAllBrands(): Promise<(string | null)[]> {
    return HttpService.request<(string | null)[]>(
      'get_fields',
      {
        field: 'brand',
      },
      (response) => {
        return response.filter((o) => o !== null);
      },
    );
  }

  public static async getFilteredProducts(
    params: Partial<ProductsFilters>,
  ): Promise<ProductType[]> {
    const filteredItemsIds = await HttpService.request<string[]>(
      'filter',
      params,
    );

    return this.fetchItemsByIds(filteredItemsIds.slice(0, this.DEFAULT_LIMIT));
  }
}
