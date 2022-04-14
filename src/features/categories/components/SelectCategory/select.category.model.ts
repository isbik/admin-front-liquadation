import { createEffect, createStore } from 'effector';
import { api } from '../../../../services';
import { Paginated } from '../../../../types';
import { Category } from '../../categories.model';

const fetchCategoriesFx = createEffect<void, Category[]>();

const $categories = createStore<Category[]>([]);

fetchCategoriesFx.use(async () => {
  const response = await api.get<Paginated<Category>>('/categories', {
    params: {
      parentCategory: 'null',
    },
  });
  return response.data.items;
});

$categories.on(fetchCategoriesFx.doneData, (_, data) => data);

export { $categories, fetchCategoriesFx };
