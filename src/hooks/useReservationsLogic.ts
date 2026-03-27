import { useEffect, useMemo, useState } from "react";
import { useReservations } from "../hooks/useReservations";
import { RoomService } from "../services/room.service";
import type { Room } from "../types";

export const useReservationLogic = () => {

    const {reservations, loading: loadingRes, error} = useReservations();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string>("all");
    const [timeFilter, setTimeFilter] =useState<string>("pending");
    const [loadingRooms, setLoadingRooms] = useState<boolean>(true);

    useEffect(()=>{
        const fetchRooms = async () => {
            try{
                const data = await RoomService.getAll();
                setRooms(data);
            }catch (err){
                console.error("Error al cargar las salas para el filtro", err);
            }finally{
                setLoadingRooms(false)
            }
        };
        fetchRooms();
    }, []);

    const filteredAndSortedReservations = useMemo(()=> {
        if (!reservations) return [];

        return reservations
            .filter((reserva) => {
                const matchesRoom = selectedRoomId === "all" || String(reserva.roomId) === selectedRoomId;

                let matchesTime = true;

                if (timeFilter !== "all"){
                    const now = new Date().getTime(); 
                    const endTime = new Date(reserva.endTime).getTime(); 
                
                    const isFinished = endTime < now;
                    if (timeFilter === "pending"){
                        matchesTime = !isFinished;
                    }else if (timeFilter === "finished"){
                        matchesTime = isFinished;
                    }
                }

                return matchesRoom && matchesTime;
            })
            .sort((a, b) =>  new Date(a.startTime).getTime()- new Date(b.startTime).getTime());
    }, [reservations, selectedRoomId, timeFilter]);
        
    const isLoading = loadingRes || loadingRooms;

    return{ rooms, selectedRoomId, setSelectedRoomId, timeFilter, setTimeFilter, filteredAndSortedReservations, loading: isLoading, error}
}