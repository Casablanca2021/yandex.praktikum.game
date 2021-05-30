import { post } from 'api/http';
import { FeedBack } from 'api/types';
import { headersJSON as headers } from 'common';

interface Feedback {
  send: (data: FeedBack) => Promise<void>;
}

export const Feedback: Feedback = {
  send: (data: FeedBack): Promise<void> => post('/api/v1/feedback', data, { headers }),
};
