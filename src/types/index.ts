export interface Room {
    id: number;
    name: string;
    capacity: number;
    createdAt?: string;
}

export type ReservationStatus = 'acrive' | 'cancelled';

export interface Reservation {
    id: number;
    roomId: number;
    userId: number;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
    createdAt: string;
    room?: Room;
}