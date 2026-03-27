import { useMemo, useState } from 'react';
import { useReservations } from '../hooks/useReservations';
import { type View } from 'react-big-calendar';
import { type CalendarEvent } from '../types';


export const useCalendarLogic = () => {

    const { reservations, loading, error } = useReservations();

    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>('month');

    const isPastEvent = selectedEvent ? selectedEvent.end.getTime() < new Date().getTime() : false;
    
    const calendarEvents: CalendarEvent[] = useMemo(() => {
        if (!reservations) return [];

        return reservations
            .filter(reserva => reserva.status === 'active')
            .map(reserva => ({
                id: reserva.id, 
                title: `${reserva.room?.name} (Usuario: ${reserva.userId})`, 
                start: new Date(reserva.startTime),
                end: new Date(reserva.endTime),
            }));
    }, [reservations]);


    return { selectedEvent, setSelectedEvent, currentDate, setCurrentDate, currentView, setCurrentView, loading, error, isPastEvent, calendarEvents }
    
}