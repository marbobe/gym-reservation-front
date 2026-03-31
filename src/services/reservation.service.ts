import api from "../api/axiosConfig";
import type { Reservation, UpdateReservationDTO } from "../types";

export const ReservationService = {
    getAll: async (): Promise<Reservation[]> => {
        const response = await api.get<Reservation[]>('/reservations');
        return response.data;
    },

    getById: async (id:number|string): Promise<Reservation> => {
        const response = await api.get<Reservation>(`/reservations/${id}`);

        console.log("Respuesta real del backend (getById):", response.data);
        return response.data;
    },

    create: async (reservationData: Omit<Reservation, 'id'|'createdAt'|'status'>): Promise<Reservation> => {
        const response = await api.post<Reservation>('/reservations', reservationData);
        return response.data;
    },

    update: async (id: number | string, data: UpdateReservationDTO) : Promise<Reservation> => {
        const response = await api.patch<Reservation>(`/reservations/${id}`, data);
        return response.data;
    },

    cancel: async (id: number): Promise<void> => {
        await api.patch<Reservation>(`/reservations/${id}/cancel`);
    }

}
