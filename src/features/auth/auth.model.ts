import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector';
import { api } from '../../services';

const changeLogin = createEvent<string>();
const changePassword = createEvent<string>();
const submitForm = createEvent();
const logout = createEvent();

const logoutFx = createEffect();

logoutFx.use(async () => {
  await api.post('/auth/logout');
});

sample({
  clock: logout,
  target: logoutFx,
});

const $login = restore(changeLogin, 'test@gmail.com');
const $password = restore(changePassword, 'password');

const loginFx = createEffect<void, any>();

loginFx.use(async ([login, password]: any) => {
  const response = await api.post('/auth/login', {
    phoneOrEmail: login,
    password,
  });
  return response.data;
});

const initAuthFx = createEffect<void, any>();

initAuthFx.use(async () => {
  const response = await api.get('/auth');
  return response.data;
});

sample({
  clock: submitForm,
  source: [$login, $password],
  target: loginFx,
});

const $setUser = createEvent('');

sample({
  clock: [loginFx.doneData, initAuthFx.doneData],
  target: $setUser,
});

const $isAuthenticated = createStore(false)
  .on($setUser, (_, user) => Boolean(user))
  .reset(logout);

const $isAuthenticating = combine(
  initAuthFx.pending,
  loginFx.pending,
  (...values) => {
    return values.some(Boolean);
  },
);

export {
  submitForm as $submitForm,
  changeLogin as $changeLogin,
  changePassword as $changePassword,
  $login,
  $password,
  loginFx,
  $isAuthenticated,
  initAuthFx,
  $setUser,
  $isAuthenticating,
  logout,
};
