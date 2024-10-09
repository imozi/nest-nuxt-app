import { Request } from 'express';

export interface RefresTokenPayload {
  sub: string;
  sid: string;
}

export interface RequestWithTokenPayload extends Request {
  user?: RefresTokenPayload;
}
