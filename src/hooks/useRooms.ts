import { useState, useEffect } from "react";
import type { Room } from "../types";
import { RoomService } from "../services/room.service";

export const useRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const data = await RoomService.getAll();
            setRooms(data);
        } catch (err) {
            setError('Error al cargar las salas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return { rooms, loading, error, refreshRooms: fetchRooms };
};