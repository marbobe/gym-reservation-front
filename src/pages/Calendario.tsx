import { useMemo } from 'react';
import { useReservations } from '../hooks/useReservations';

// 1. IMPORTS DEL CALENDARIO Y FECHAS
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';

// ¡MUY IMPORTANTE! Los estilos base del calendario
import 'react-big-calendar/lib/css/react-big-calendar.css';

// 2. CONFIGURACIÓN DEL IDIOMA Y LOCALIZADOR
const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // La semana empieza en Lunes
  getDay,
  locales,
});

export const Calendario = () => {
    const { reservations, loading, error } = useReservations();

    const calendarEvents = useMemo(() => {
        if (!reservations) return [];

        return reservations
            .filter(reserva => reserva.status === 'active')
            .map(reserva => {
                // Aquí podrías añadir también el nombre de la sala si lo tuvieras en el objeto reserva
                return {
                    id: reserva.id,
                    title: `Sala ${reserva.roomId} - Reserva #${reserva.id}`, 
                    start: new Date(reserva.startTime),
                    end: new Date(reserva.endTime),
                };
            });
    }, [reservations]);

    if (loading) return <p className="p-8 text-neutral-500">Cargando el calendario...</p>;
    if (error) return <p className="p-8 text-rose-500">Error al cargar: {error}</p>;

    return (
        <div className="p-8 md:p-16 max-w-7xl mx-auto w-full">
            <header className="border-b border-neutral-200 pb-10 mb-8">
                <h1 className="font-serif text-4xl tracking-tight text-neutral-900 mb-2">
                    Calendario de Sesiones
                </h1>
                <p className="font-sans text-neutral-500 text-lg font-light">
                    Vista visual de todas las reservas activas.
                </p>
            </header>

            {/* 3. EL COMPONENTE CALENDARIO */}
            <div className="bg-white border border-neutral-200 p-6 h-[700px] font-sans">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    culture="es" // Forzamos el idioma a español
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda",
                        date: "Fecha",
                        time: "Hora",
                        event: "Evento",
                        noEventsInRange: "No hay reservas en este rango de fechas.",
                    }}
                    style={{ height: '100%' }} // Necesario para que ocupe todo el div padre
                />
            </div>
        </div>
    );
};