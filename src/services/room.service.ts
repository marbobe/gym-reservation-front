import api from "../api/axiosConfig";
import type { Room } from '../types';

export const RoomService = {
    getAll: async (): Promise<Room[]> => {
        const response = await api.get<Room[]>('/rooms');
        return response.data;
    },

    getById: async (id: string | number): Promise<Room> => {
        const response = await api.get<Room>(`/rooms/${id}`);
        console.log("Respuesta real del backend (getById):", response.data);
        return response.data;
    },

    create: async (roomData: Omit<Room, 'id' | 'createdAt'>): Promise<Room> => {
        const response = await api.post<Room>('/rooms',roomData);
        return response.data;
    },

    update: async (id: string | number, roomData: Partial<Room>): Promise<Room> =>{
        const response = await api.patch<Room>(`/rooms/${id}`, roomData);
        return response.data;
    },

    //Cambia status de active a deleted. Hace soft delete.
    toggleStatus: async (id: string | number, newStatus: 'active'|'deleted'): Promise<Room> =>{
        const response = await api.patch<Room>(`/rooms/${id}`, {status: newStatus});
        return response.data;
    },
};