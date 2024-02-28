import { HttpService } from '@/services/HttpService.ts';
import { getUniqueArrayByField } from '@/utils/getUniqueArrayByField.ts';
import { ProductType } from '@/types/ProductType.ts';

export class ProductsService {
  public static async getProducts(offset = 0, limit = 50) {
    const ids = await HttpService.request<string[]>('get_ids', {
      offset,
      limit,
    });

    // TODO: add setting brands

    const items = await HttpService.request<ProductType[]>('get_items', {
      ids: [...new Set(ids)],
    });

    return getUniqueArrayByField(items, 'id');
  }
}
