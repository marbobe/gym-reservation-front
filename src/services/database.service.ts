import api from "../api/axiosConfig";

export const databaseService = {
    reset: async (): Promise<void> => {
        await api.post(`/database/reset`);
    }
}