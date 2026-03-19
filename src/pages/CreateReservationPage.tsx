import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { ReservationService } from "../services/reservation.service";
import { RoomService } from "../services/room.service";
import type { Room } from "../types";


const AVAILABLE_HOURS = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7; 
    return `${hour.toString().padStart(2, '0')}:00`; 
});

export const CreateReservationPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [room, setRoom] = useState<Room | null>(null);

    const [formData, setFormData] = useState({
        userId: 0, 
        date: "",       // Ej: "2026-03-20"
        startHour: "",  // Ej: "09:00"
        endHour: ""     // Ej: "11:00"
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

            const payload = {
                roomId: Number(id),
                userId: formData.userId,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
            };

            await ReservationService.create(payload);
            
            navigate('/rooms');

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

    const today = new Date().toISOString().split('T')[0];

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
                    Selecciona el día y la franja horaria para tu sesión.
                </p>
            </header>

            {error && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-900 font-sans text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* ID de Usuario Ficticio */}
                    <div className="md:col-span-3 relative mb-6">
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

                    {/* Selector de Fecha */}
                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Fecha
                        </label>
                        <input 
                            name="date" 
                            type="date" 
                            min={today} // Bloquea fechas anteriores a hoy
                            value={formData.date} 
                            onChange={handleChange} 
                            required
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors"
                        />
                    </div>

                    {/* Selector de Hora Inicio */}
                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Hora Inicio
                        </label>
                        <select 
                            name="startHour" 
                            value={formData.startHour} 
                            onChange={handleChange} 
                            required
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors cursor-pointer"
                        >
                            <option value="" disabled>Selecciona...</option>
                            {AVAILABLE_HOURS.map(hour => (
                                <option key={`start-${hour}`} value={hour}>{hour}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selector de Hora Fin */}
                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Hora Fin
                        </label>
                        <select 
                            name="endHour" 
                            value={formData.endHour} 
                            onChange={handleChange} 
                            required
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors cursor-pointer"
                        >
                            <option value="" disabled>Selecciona...</option>
                            {AVAILABLE_HOURS.map(hour => (
                                <option key={`end-${hour}`} value={hour}>{hour}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="mt-16 flex md:flex-row justify-between gap-4">
                    <Button variant="secondary" onClick={()=> navigate('/rooms')}> Cancelar </Button>

                    <Button type="submit" disabled={loading}> 
                        {loading ? 'Procesando...' : 'Confirmar Reserva'}
                    </Button>
                    
                </div>
            </form>
        </div>
    );
}