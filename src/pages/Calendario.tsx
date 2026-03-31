import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '../components/ui/Button';
import { type CalendarEvent } from '../types';

import { dateFnsLocalizer} from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { es } from 'date-fns/locale/es';

import { useCalendarLogic } from '../hooks/useCalendarLogic';


const locales = { 'es': es };

const localizer = dateFnsLocalizer({
    format, parse, startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), getDay, locales,
});

const CALENDAR_MESSAGES = {
    next: "Siguiente", previous: "Anterior", today: "Hoy", month: "Mes",
    week: "Semana", day: "Día", agenda: "Agenda", date: "Fecha",
    time: "Hora", event: "Evento", noEventsInRange: "No hay reservas en este rango de fechas.",
};

const eventStyleGetter = (event: CalendarEvent, _start: Date, _end: Date, isSelected: boolean) => {

    let bgColor = '#404040';

    if (event.title.includes('Baile')) bgColor = '#551616';
        else if (event.title.includes('Yoga')) bgColor = '#2b4c2b';
        else if (event.title.includes('Spinning')) bgColor = '#163355';
        else if (event.title.includes('Pilates')) bgColor = '#553c16';
        else if (event.title.includes('Boxeo')) bgColor = '#4b2f5eff';
        else if (event.title.includes('Crossfit')) bgColor = '#404040';
        else if (event.title.includes('Aquagym')) bgColor = '#1d5772ff';


    return {
        style: {
            backgroundColor: isSelected ? '#171717' : bgColor,
            borderRadius: '0px', 
            color: 'white',
            border: '2px solid #ffffff',
            display: 'block',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: '0.70rem',
            textTransform: 'uppercase' as const, 
            letterSpacing: '0.05em', 
            padding: '6px 8px',
            showMore: (count: number) => `+${count} más`,
        }
    };
};

export const Calendario = () => {
    const navigate = useNavigate();
    const { selectedEvent, setSelectedEvent, currentDate, setCurrentDate, currentView, setCurrentView, loading, error, isPastEvent, calendarEvents } = useCalendarLogic();

    if (loading) { 
        return (
          <div className="flex justify-center items-center h-[70vh]">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">Cargando espacios...</p>
          </div>
        );
    }

    if (error) {
        return <p className="text-rose-900 bg-rose-50 p-4 border border-rose-200">{error}</p>;
    }

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full ">
            
            <header className="border-b border-neutral-200 pb-10 mb-8">
                <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-2">
                    Calendario de Sesiones
                </h1>
                <p className="font-sans text-neutral-500 mt-4 text-lg font-light">
                    Visualiza en el calendario todas las sesiones activas
                </p>
            </header>

            <div className="bg-white border border-neutral-200 p-2 md:p-6 h-[500px] md:h-[700px] font-sans overflow-x-auto">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    culture="es" 
                    onSelectEvent={(event) => setSelectedEvent(event as CalendarEvent)}
                    eventPropGetter={eventStyleGetter}
                    date={currentDate}
                    onNavigate={setCurrentDate}
                    view={currentView}
                    onView={setCurrentView}
                    messages={CALENDAR_MESSAGES}
                    style={{ height: '100%' }} 
                />
            </div>

            {/* MODAL  */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4 transition-opacity">
                    <div className="bg-white border border-neutral-200 p-10 md:p-12 w-full max-w-lg shadow-2xl relative">
                        
                        <button 
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors text-3xl font-light leading-none focus:outline-none"
                        >
                            &times;
                        </button>

                        <div className="mb-10">
                            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
                                Detalles de la sesión
                            </p>
                            <h3 className="font-serif text-4xl tracking-tight text-neutral-900 leading-tight">
                                {selectedEvent.title}
                            </h3>
                        </div>

                        <div className="flex flex-col gap-4 font-sans mb-12">
                            <div className="border-b border-neutral-100 pb-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">Inicio</p>
                                <p className="text-neutral-900 text-lg font-light">
                                    {selectedEvent.start.toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
                                </p>
                            </div>
                            
                            <div className="border-b border-neutral-100 pb-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">Fin</p>
                                <p className="text-neutral-900 text-lg font-light">
                                    {selectedEvent.end.toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
                                </p>
                            </div>
                            
                            <div className="border-b border-neutral-100 pb-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">ID Reserva</p>
                                <p className="text-neutral-900 text-lg font-serif italic">#{selectedEvent.id}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <Button variant='secondary' onClick={() => setSelectedEvent(null)}>
                                Cerrar
                            </Button>
                            
                            <Button 
                                variant='danger' 
                                disabled={isPastEvent}
                                onClick={() => navigate(`/reservations/${selectedEvent.id}/edit`)}
                            >
                                Editar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};