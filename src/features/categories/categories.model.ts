import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector';
import { api } from '../../services';
import { CloudFile, Paginated } from '../../types';

export type Category = {
  id: number;
  name: string;
  parentCategory: any;
  image: CloudFile | null;
};

const PER_PAGE = 10;

const changePage = createEvent<number>();
const setFilters = createEvent<Record<string, any>>();

const $categories = createStore<Category[]>([]);
const $total = createStore<number>(0);
const $page = restore(changePage, 0).reset(setFilters);
const $filters = createStore<Record<string, any>>({}).on(
  setFilters,
  (_, payload) => payload,
);

const fetchCategoriesFx = createEffect<void, Paginated<Category>>();

fetchCategoriesFx.use(async ({ page, filters }) => {
  const response = await api.get<Paginated<Category>>('/categories', {
    params: {
      limit: PER_PAGE,
      offset: PER_PAGE * page,
      orderBy: 'id',
      orderSort: -1,
      ...filters,
    },
  });

  return response.data;
});

sample({
  clock: [changePage, setFilters],
  source: [$page, $filters],
  fn: ([page, filters]) => ({ page, filters }),
  target: fetchCategoriesFx,
});

$categories.on(fetchCategoriesFx.doneData, (_, data) => data.items);
$total.on(fetchCategoriesFx.doneData, (_, data) => data.total);

const deleteCategoryFx = createEffect({
  handler: async (id: number) => {
    await api.delete('/categories/' + id);
  },
});

sample({
  clock: deleteCategoryFx.doneData,
  source: [$page],
  target: fetchCategoriesFx,
});

const toggleModal = createEvent();

const $isOpenModal = createStore(false).on(toggleModal, (state) => !state);

const changeCategoryName = createEvent<string>();
const changeParentCategoryId = createEvent<number | null>();
const changeCategoryId = createEvent<number | null>();
const changeCategoryImage = createEvent<CloudFile | null>();

const createCategoryFx = createEffect<any, Category>({
  handler: async ([name, categoryId, image]): Promise<Category> => {
    const response = await api.post('/categories', {
      name,
      categoryId,
      imageId: image?.id,
    });
    return response.data;
  },
});

const updateCategoryFx = createEffect<any, Category>({
  handler: async ([id, name, categoryId, image]) => {
    await api.patch('/categories/' + id, {
      name,
      categoryId,
      imageId: image?.id,
    });
  },
});

const $categoryName = restore(changeCategoryName, '').reset(toggleModal);

const $categoryId = restore(changeCategoryId, null).reset(toggleModal);
const $categoryImage = restore<null | CloudFile>(
  changeCategoryImage,
  null,
).reset(toggleModal);

const $parentCategoryId = restore(changeParentCategoryId, null).reset(
  toggleModal,
);

const createCategory = createEvent();

sample({
  clock: createCategory,
  source: [$categoryName, $parentCategoryId, $categoryImage],
  target: createCategoryFx,
});

sample({
  clock: createCategoryFx.doneData,
  source: [$page],
  target: [toggleModal, fetchCategoriesFx],
});

const editCategoryFromTable = createEvent<Category>();

sample({
  clock: editCategoryFromTable,
  target: toggleModal,
});

sample({
  clock: editCategoryFromTable,
  fn: ({ name }) => name,
  target: $categoryName,
});

sample({
  clock: editCategoryFromTable,
  fn: ({ id }) => id,
  target: $categoryId,
});

sample({
  clock: editCategoryFromTable,
  fn: ({ parentCategory }) => parentCategory.id,
  target: $parentCategoryId,
});

sample({
  clock: editCategoryFromTable,
  fn: ({ image }) => image,
  target: $categoryImage,
});

const updateCategory = createEvent();

sample({
  clock: updateCategory,
  source: [$categoryId, $categoryName, $parentCategoryId, $categoryImage],
  target: updateCategoryFx,
});

sample({
  clock: [updateCategoryFx.doneData],
  target: [toggleModal, fetchCategoriesFx],
});

export {
  fetchCategoriesFx,
  $categories,
  deleteCategoryFx,
  $isOpenModal,
  toggleModal,
  $categoryName,
  $parentCategoryId,
  changeCategoryName,
  changeParentCategoryId,
  createCategory,
  $categoryId,
  editCategoryFromTable,
  updateCategory,
  $total,
  $page,
  changePage,
  PER_PAGE,
  $categoryImage,
  changeCategoryImage,
  $filters,
  setFilters,
};
