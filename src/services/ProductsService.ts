import { HttpService } from '@/services/HttpService.ts';
import { getUniqueArrayByField } from '@/utils/getUniqueArrayByField.ts';
import { ProductType } from '@/types/ProductType.ts';

export class ProductsService {
  private static async fetchItemsByIds(ids: string[]) {
    return HttpService.request<ProductType[]>('get_items', {
      ids: [...new Set(ids)],
    });
  }

  public static async getProducts(
    offset = 0,
    limit = 50,
  ): Promise<ProductType[]> {
    const ids = await HttpService.request<string[]>('get_ids', {
      offset,
      limit,
    });

    // TODO: add setting brands

    const items = await this.fetchItemsByIds(ids);

    // @NOTE: можно филтровать по всем полям (принимает только одно поле), кроме ID
    // const filteredItemsIds = await HttpService.request<string[]>('filter', {
    //   id: '981d0e2b-e9c2-488d-808f-459601317949',
    //   // price: 9500,
    // });

    // const items = await this.fetchItemsByIds(filteredItemsIds);

    return getUniqueArrayByField(items, 'id');
  }
}
