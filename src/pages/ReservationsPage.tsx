
import { Badge } from "../components/ui/Badge";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useReservationLogic } from "../hooks/useReservationsLogic";

export const ReservationsPage = () => {
    const navigate = useNavigate();

    const { rooms, selectedRoomId, setSelectedRoomId, timeFilter, setTimeFilter, filteredAndSortedReservations, loading, error} = useReservationLogic();

    if(loading){
        return (
          <div className="flex justify-center items-center h-full">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">Cargando reservas...</p>
          </div>
        );
    }
    if(error){
       return <p className="text-rose-900 bg-rose-50 p-4 border border-rose-200">{error}</p>;
    }

    return(
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
            <header className="border-b border-neutral-200 pb-10 mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                    <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-2">
                        Gestión de Reservas
                    </h1>
                    <p className="font-sans text-neutral-500 mt-4 text-lg font-light">
                        Consulta y administra las sesiones programadas.
                    </p>
                </div>

                {/* EL FILTRO */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Filtro de Tiempo */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">
                            Estado
                        </label>
                        <select 
                            value={timeFilter} 
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="bg-white border border-neutral-200 px-4 py-2 text-neutral-900 font-sans text-sm focus:outline-none focus:border-neutral-950 transition-colors cursor-pointer"
                        >
                            <option value="all">Todas las fechas</option>
                            <option value="pending">Pendientes / En curso</option>
                            <option value="finished">Finalizadas</option>
                        </select>
                    </div>

                    {/* Filtro de Sala */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">
                            Sala
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
                    
                </div>
                <div className="flex flex-col w-full md:w-auto">
                        <Link to="/reservations/new" className="w-full">
                            <Button variant="secondary" className="w-full">Nueva Reserva</Button>
                        </Link>
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
                                        <button 
                                            disabled={(reserva.status === "cancelled")}
                                            onClick={() => navigate(`/reservations/${reserva.id}/edit`)}
                                            className={`inline-flex items-center justify-center px-3 py-1.5 font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none border ${
                                                reserva.status === 'cancelled' 
                                                    ? 'bg-neutral-200 text-neutral-400 border-neutral-200 cursor-not-allowed' 
                                                    : 'bg-rose-950 hover:bg-rose-900 text-white border-rose-950 cursor-pointer'
                                            }`}
                                        >
                                            Editar
                                        </button>
                                        
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