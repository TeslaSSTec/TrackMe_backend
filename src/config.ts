import * as process from 'process';

export const DB_HOST =
  process.env.DB_HOST ??
  (() => {
    throw new Error('Env DB_HOST not defined');
  })();

export const DB_PORT =
  Number(process.env.DB_PORT) ??
  (() => {
    throw new Error('Env DB_PORT not defined');
  })();

export const DB_USER =
  process.env.DB_USER ??
  (() => {
    throw new Error('Env DB_USER not defined');
  })();

export const DB_PASS =
  process.env.DB_PASS ??
  (() => {
    throw new Error('Env DB_PASS not defined');
  })();

export const DB_NAME =
  process.env.DB_NAME ??
  (() => {
    throw new Error('Env DB_NAME not defined');
  })();

export const JWT_SECRET =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error('Env JWT_SECRET not defined');
  })();

if (JWT_SECRET.length < 60) {
  throw new Error('JWT_SECRET must be at least 60 symbols length');
}

export const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);