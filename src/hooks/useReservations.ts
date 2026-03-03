import { useState,useEffect } from "react";
import type { Reservation } from "../types";
import { ReservationService } from "../services/reservation.service";

export const useReservations = () => {
    const [reservations, setReservations ] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReservations = async () => {
        try{
            setLoading(true);
            const data = await ReservationService.getAll();
            setReservations(data);
        }catch (err){
            setError('Error al cargar las reservas');
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=> {
        fetchReservations();
    }, []);

    return {reservations, loading, error, refreshReservations: fetchReservations};
}