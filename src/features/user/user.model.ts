import { createStore } from 'effector';
import { $setUser, logout } from '../auth/auth.model';

const $user = createStore(null)
  .on($setUser, (_, user) => user)
  .reset(logout);

export { $user };
