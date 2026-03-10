export type RoomStatus = 'active' | 'deleted';
export interface Room {
    id: number;
    name: string;
    capacity: number;
    pricePerHour: number;
    description?: string;
    imageUrl?: string;
    createdAt?: string;
    className?: string;
    status: RoomStatus;
}

export type ReservationStatus = 'active' | 'cancelled';

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