import { api } from '@/shared/utils/api';

export const deleteAuction = async (id: string) => {
  try {
    await api.delete(`/appointment/${id}`);
  } catch (error) {
    console.error(error);
  }
};
