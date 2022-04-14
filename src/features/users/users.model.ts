import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector';
import { api } from '../../services';
import { Paginated } from '../../types';
import { User, UserEmailStatus } from './users.types';

const PER_PAGE = 10;

const changePage = createEvent<number>();

const $users = createStore<User[]>([]);
const $total = createStore<number>(0);
const $page = restore<number>(changePage, 0);

const fetchUsersFx = createEffect<[number], Paginated<User>>();

fetchUsersFx.use(async ([page]) => {
  const response = await api.get<Paginated<User>>('/users', {
    params: {
      limit: PER_PAGE,
      offset: PER_PAGE * page,
    },
  });

  return response.data;
});

sample({
  clock: [changePage],
  source: [$page],
  target: fetchUsersFx,
});

$users.on(fetchUsersFx.doneData, (_, data) => data.items);
$total.on(fetchUsersFx.doneData, (_, data) => data.total);

type ChangeUserStatusParams = {
  userId: number;
  status: UserEmailStatus;
};

const changeUserStatusFx = createEffect<
  ChangeUserStatusParams,
  ChangeUserStatusParams
>({
  handler: async ({ userId, status }) => {
    await api.patch('/users/change-status', { ids: [userId], status });
    return { userId, status };
  },
});

const changeUserStatus = createEvent<ChangeUserStatusParams>();

sample({
  clock: changeUserStatus,
  target: changeUserStatusFx,
});

$users.on(changeUserStatusFx.doneData, (state, { userId, status }) => {
  return state.map((user) => {
    if (user.id === userId) user.emailStatus = status;
    return user;
  });
});

export {
  fetchUsersFx,
  $users,
  $total,
  $page,
  changePage,
  PER_PAGE,
  changeUserStatus,
};
