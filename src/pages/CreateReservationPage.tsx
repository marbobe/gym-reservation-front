import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { ReservationService } from "../services/reservation.service";
import { RoomService } from "../services/room.service"; 
import type { Room } from "../types";

export const CreateReservationPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const [room, setRoom] = useState<Room | null>(null);

    const [formData, setFormData] = useState({
        userId: 0, 
        startTime: "", 
        endTime: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (id) {
            const fetchRoom = async () => {
                try {
                    const roomData = await RoomService.getById(id);
                    setRoom(roomData);
                } catch (err) {
                    console.error("No se pudo cargar la info de la sala", err);
                }
            };
            fetchRoom();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target; 
        
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        }));
    };

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null);
        
        try {
            const payload = {
                roomId: Number(id), 
                userId: formData.userId,
                startTime: new Date(formData.startTime).toISOString(), 
                endTime: new Date(formData.endTime).toISOString(),
            };

            await ReservationService.create(payload);
            
            navigate('/reservations');

        } catch (err: any) {
            setError("Error al crear la reserva. " + (err.message || ""));
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="p-8 md:p-16 max-w-3xl mx-auto w-full">
            
            <header className="border-b border-neutral-200 pb-10 mb-12">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
                    Nueva Reserva
                </p>
                <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-4">
                    {room ? room.name : 'Cargando espacio...'}
                </h1>
                <p className="font-sans text-neutral-500 text-lg font-light">
                    Selecciona tu ID de usuario y la franja horaria que deseas bloquear.
                </p>
            </header>

            {error && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-900 font-sans text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* ID de Usuario Ficticio */}
                    <div className="md:col-span-2 relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Número de Usuario (ID)
                        </label>   
                        <input 
                            name="userId" 
                            type="number" 
                            min="1"
                            placeholder="Ej. 1234" 
                            value={formData.userId || ""} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-2xl focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:font-sans placeholder:text-lg placeholder:text-neutral-300"
                        />
                    </div>

                    {/* Fecha y Hora de Inicio */}
                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Fecha y hora de inicio
                        </label>
                        <input 
                            name="startTime" 
                            type="datetime-local" 
                            value={formData.startTime} 
                            onChange={handleChange} 
                            required
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors"
                        />
                    </div>

                    {/* Fecha y Hora de Fin */}
                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Fecha y hora de fin
                        </label>
                        <input 
                            name="endTime" 
                            type="datetime-local" 
                            value={formData.endTime} 
                            onChange={handleChange} 
                            required
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors"
                        />
                    </div>
                </div>
                
                <div className="mt-16 pt-8 border-t border-neutral-100 flex justify-end">
                    <Button type="submit" disabled={loading}> 
                        {loading ? 'Procesando...' : 'Confirmar Reserva'}
                    </Button>
                </div>
            </form>
        </div>
    );
}