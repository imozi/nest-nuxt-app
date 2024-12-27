export type SupportMail = {
  id: string;
  name: string;
  email: string;
  position: string;
  organization: string;
  status: SupportMailStatus;
  question: string;
  remoteId: string;
  createdAt: string;
  updatedAt: string;
};

type SupportMailStatus = 'new' | 'progress' | 'technical' | 'closed' | 'deferred' | 'viewed';
