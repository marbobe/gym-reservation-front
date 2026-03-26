import { useParams, useNavigate, useLocation} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ReservationService } from "../services/reservation.service";
import { RoomService } from "../services/room.service";
import type { Room } from "../types";

export const useReservationForm = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const location = useLocation();

    const isEditMode = location.pathname.includes('/edit');

    const [initialLoading, setInitialLoading] = useState(isEditMode);

    const [room, setRoom] = useState<Room | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);

    const [formData, setFormData] = useState({
        roomId: "",
        userId: 0, 
        date: "",       
        startHour: "",  
        endHour: ""     
    });
    const [reservationStatus, setReservationStatus] = useState<string>("active");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const today = new Date().toISOString().split('T')[0];

    const isCancelled = reservationStatus === 'cancelled';

    useEffect(() => {
        const loadInitialData = async () => {
            try{
                if (isEditMode && id){
                    const reservation = await ReservationService.getById(id);
                    setReservationStatus(reservation.status);

                    const roomData = await RoomService.getById(reservation.roomId);
                    setRoom(roomData);

                    const startDate = new Date(reservation.startTime);
                    const endDate = new Date(reservation.endTime);

                    setFormData({
                        roomId: reservation.roomId.toString(),
                        userId: reservation.userId,
                        date: startDate.toISOString().split('T')[0], 
                        startHour: `${startDate.getHours().toString().padStart(2, '0')}:00`, 
                        endHour: `${endDate.getHours().toString().padStart(2, '0')}:00`
                    });
                }else if (id){
                    //MODO CREACIÓN
                    const roomData = await RoomService.getById(id);
                    setRoom(roomData);
                    setFormData(prev => ({ ...prev, roomId: id}));
                }else{
                    //MODO CREACIÓN GLOBAL
                    const allRooms = await RoomService.getAll();
                    setRooms(allRooms);
                }
            } catch (err){
                console.error("Error al cargar los datos: ", err);
                setError("No se pudieron cargar los datos de la reserva o sala.");
            } finally {
                setInitialLoading(false);
            }
        }

        loadInitialData();
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target; 
        
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        }));
    };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null);
        
        try {

            if (formData.startHour >= formData.endHour) {
                throw new Error("La hora de fin debe ser posterior a la de inicio.");
            }

            const startDateTime = new Date(`${formData.date}T${formData.startHour}`);
            const endDateTime = new Date(`${formData.date}T${formData.endHour}`);

            if(isEditMode){
                const updatePayload = {
                    userId: formData.userId,
                    startTime: startDateTime.toISOString(),
                    endTime: endDateTime.toISOString(),
                };

                await ReservationService.update(id as string, updatePayload);

                navigate('/reservations');
            } else {

                const createPayload = {
                    roomId: Number(formData.roomId),
                    userId: formData.userId,
                    startTime: startDateTime.toISOString(),
                    endTime: endDateTime.toISOString(),
                };
                await ReservationService.create(createPayload);
                navigate('/reservations');
            }

        } catch (err: any) {
            if (err.response) {
                const backendMessage = err.response.data?.message || err.response.data?.error;
                
                if (backendMessage) {
                    setError(`No se pudo reservar: ${backendMessage}`);
                } else {
                    setError("Hubo un problema con el servidor. Inténtalo de nuevo más tarde.");
                }
            } 
            else {
                setError(err.message || "Error de conexión al crear la reserva.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (reservationId: string | undefined) => {
        if (!reservationId) return;
        const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
        if (!confirmCancel) return;
        try{
            await ReservationService.cancel(Number(reservationId));
            navigate('/reservations');
        }catch (error){
            console.error("Error al cancelar:", error);
            setError("No se pudo cancelar la reserva. Revisa la consola.");
            setLoading(false);
        }
    }



    return { id, initialLoading, room, rooms, formData, isEditMode, loading, error,  today, isCancelled, handleSubmit, handleChange, handleCancelReservation}
}