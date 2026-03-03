import api from "../api/axiosConfig";
import type { Reservation } from "../types";

export const ReservationService = {
    getAll: async (): Promise<Reservation[]> => {
        const response = await api.get<Reservation[]>('/reservations');
        return response.data;
    },

    create: async (reservationData: Omit<Reservation, 'id'|'createdAt'|'status'>): Promise<Reservation> => {
        const response = await api.post<Reservation>('/reservations', reservationData);
        return response.data;
    },

    cancel: async (id: number): Promise<void> => {
        await api.patch<Reservation>(`/reservations/${id}/cancel`);
    }

}
