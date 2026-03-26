import { useNavigate} from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useReservationForm } from "../hooks/useReservationForm";


const AVAILABLE_HOURS = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7; 
    return `${hour.toString().padStart(2, '0')}:00`; 
});

export const CreateReservationPage = () => {
    const navigate = useNavigate();
    const { id, initialLoading, room, rooms, formData, isEditMode, loading, error,  today, isCancelled, handleSubmit, handleChange, handleCancelReservation} = useReservationForm();

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">
                    Cargando datos de la reserva...
                </p>
            </div>
        );
    }

    return(
        <div className="p-8 md:p-16 max-w-3xl mx-auto w-full">
            
            <header className="border-b border-neutral-200 pb-10 mb-12">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
                    {isEditMode ? 'Editar Reserva' : 'Nueva Reserva'}
                </p>
                <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-4">
                    {room ? room.name : 'Reserva General'}
                </h1>
                <p className="font-sans text-neutral-500 text-lg font-light">
                    {isEditMode 
                        ? 'Modifica los detalles de la sesión.' 
                        : 'Selecciona el día y la franja horaria para tu sesión.'}
                </p>
            </header>

            {error && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-900 font-sans text-sm">
                    {error}
                </div>
            )}

            {isCancelled && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-900 font-sans text-sm flex items-center justify-between">
                    <span>Esta reserva está cancelada y no puede ser modificada.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Selector de Espacio (Sala) */}
                    <div className="md:col-span-3 relative mb-6">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Espacio Deportivo
                        </label>
                        {room ? (

                            <p className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-2xl">
                                {room.name}
                            </p>
                        ) : (

                            <select 
                                name="roomId" 
                                value={formData.roomId} 
                                onChange={handleChange} 
                                required
                                disabled={isCancelled}
                                className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-2xl focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors cursor-pointer"
                            >
                                <option value="" disabled>Selecciona un espacio...</option>
                                {rooms.map(r => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
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
                            disabled={isCancelled}
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
                            disabled={isCancelled}
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
                            disabled={isCancelled}
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
                            disabled={isCancelled}
                            className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors cursor-pointer"
                        >
                            <option value="" disabled>Selecciona...</option>
                            {AVAILABLE_HOURS.map(hour => (
                                <option key={`end-${hour}`} value={hour}>{hour}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="mt-16 flex md:flex-row justify-end gap-8">
                    <div>
                        {isEditMode && !isCancelled &&(
                            <Button 
                                type="button" 
                                variant="danger" 
                                disabled={loading}
                                onClick={() => handleCancelReservation(id)}
                            >
                                Cancelar Reserva
                            </Button>
                        )}
                       
                    </div>
                    <div className="flex gap-4">
                          <Button variant='secondary' onClick={()=> navigate (-1)}>
                            Volver
                        </Button>
                    </div>

                    <div className="flex gap-4">
                                                                    
                        {!isCancelled && (
                            <Button type="submit" disabled={loading}> 
                                {loading 
                                    ? 'Procesando...' 
                                    : (isEditMode ? 'Guardar Cambios' : 'Confirmar Reserva')}
                            </Button>
                        )}
            
                    </div>
                </div>
            </form>
        </div>
    );
}