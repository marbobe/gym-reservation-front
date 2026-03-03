import api from "../api/axiosConfig";
import type { Room } from '../types';

export const RoomService = {
    getAll: async (): Promise<Room[]> => {
        const response = await api.get<Room[]>('/rooms');
        return response.data;
    },

    create: async (roomData: Omit<Room, 'id' | 'createdAt'>): Promise<Room> => {
        const response = await api.post<Room>('/rooms',roomData);
        return response.data;
    }
};