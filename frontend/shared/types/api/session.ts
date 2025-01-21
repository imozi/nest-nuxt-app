interface SessionMetaDescription {
  os: {
    name: string;
    version: string;
  };
  device: {
    type: string;
    model: string;
    vendor: string;
  };
  browser: {
    name: string;
    version: string;
  };
}

interface SessionMeta {
  ip: string;
  ua: string;
  description: SessionMetaDescription;
}

interface Session {
  id: string;
  sessionId: string;
  deviceId: string;
  hash: string;
  meta: SessionMeta;
  expiresAt: string;
  createdAt: string;
}

export interface AccountSessionData {
  id: string;
  accountId: string;
  list: Session[];
}
