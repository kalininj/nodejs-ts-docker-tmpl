import { Request ,Response } from 'express';

import { components } from './api-types'

export type Product = components['schemas']['Product']

export interface _Request extends Request {
  apiDoc: {
    "x-express-openapi-validation-strict": Boolean
  };
}
export interface _Response extends Response {
  validateResponse: Function;
}
