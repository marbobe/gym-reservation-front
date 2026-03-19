import { useEffect, useState } from "react";
import { useReservations } from "../hooks/useReservations";
import { RoomService } from "../services/room.service";
import type { Room } from "../types";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ReservationService } from "../services/reservation.service";

export const ReservationsPage = () => {
    const {reservations, loading, error, refreshReservations} = useReservations();

    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string>("all");

    useEffect(()=>{
        const fetchRooms = async () => {
            try{
                const data = await RoomService.getAll();
                setRooms(data);
            }catch (err){
                console.error("Error al cargar las salas para el filtro", err);
            }
        };
        fetchRooms();
    }, []);

    const handleCancelReservation = async (id: number) => {
        const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
        if (!confirmCancel) return;
        try{
            await ReservationService.cancel(id);
            if(refreshReservations){
                refreshReservations();
            }
        }catch (error){
            console.error("Error al cancelar:", error);
            alert("No se pudo cancelar la reserva. Revisa la consola.")
        }
    }

    const filteredAndSortedReservations = reservations
        .filter((reserva) => {
            if (selectedRoomId === "all") return true;
            return String(reserva.roomId) === selectedRoomId;
        })
        .sort((a, b) => {
            const dateA = new Date(a.startTime).getTime();
            const dateB = new Date(b.startTime).getTime();
            return dateA - dateB;
        })


    if(loading){
        return <p>Cargando reservas ...</p>
    }
    if(error){
        return <p style={{color: 'red'}}>{error}</p>;
    }

    return(
        <div className="p-8 md:p-16 max-w-6xl mx-auto w-full">
            <header className="border-b border-neutral-200 pb-10 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-4xl tracking-tight text-neutral-900 mb-2">
                        Gestión de Reservas
                    </h1>
                    <p className="font-sans text-neutral-500 text-lg font-light">
                        Consulta y administra las sesiones programadas.
                    </p>
                </div>

                {/* EL FILTRO */}
                <div className="flex flex-col">
                    <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">
                        Filtrar por Sala
                    </label>
                    <select 
                        value={selectedRoomId} 
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="bg-white border border-neutral-200 px-4 py-2 text-neutral-900 font-sans text-sm focus:outline-none focus:border-neutral-950 transition-colors cursor-pointer"
                    >
                        <option value="all">Todas las salas</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {/* LA TABLA */}
            <div className="bg-white border border-neutral-200 overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-neutral-500 uppercase tracking-wider text-xs">ID Reserva</th>
                            <th className="px-6 py-4 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Sala</th>
                            <th className="px-6 py-4 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Fecha</th>
                            <th className="px-6 py-4 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Horario</th>
                            <th className="px-6 py-4 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {filteredAndSortedReservations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                                    No hay reservas para esta selección.
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedReservations.map((reserva) => (
                                <tr key={reserva.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4 text-neutral-500">#{reserva.id}</td>
                                    <td className="px-6 py-4 font-medium text-neutral-900">{reserva.room?.name || 'Sala desconocida'}</td>
                                    <td className="px-6 py-4 text-neutral-600">
                                        {new Date(reserva.startTime).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600">
                                        {new Date(reserva.startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - 
                                        {new Date(reserva.endTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        {reserva.status === 'active' 
                                            ? <Badge>Activa</Badge> 
                                            : <Badge status="deleted">Cancelada</Badge>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right">
        {reserva.status === 'active' ? (
            <Button 
                variant="danger" 
                onClick={() => handleCancelReservation(Number(reserva.id))}
            >
                Cancelar
            </Button>
        ) : (
            <span className="text-xs text-neutral-400 italic">No disponible</span>
        )}
    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}