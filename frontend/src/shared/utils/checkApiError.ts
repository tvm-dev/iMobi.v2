'use cliente';

import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

type ApiErrorResponse = {
  error?: string;
  [key: string]: unknown; // permite propriedades adicionais
};

export const checkApiError = (response: AxiosResponse<ApiErrorResponse>) => {
  if (response.data.error) {
    console.error(response.data.error);
    toast.error(response.data.error);
    return;
  }
};
