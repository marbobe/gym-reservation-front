import { useReservations } from "../hooks/useReservations";

export const ReservationsPage = () => {

    const {reservations, loading, error} = useReservations();

    if(loading){
        return <p>Cargando reservas ...</p>
    }
    if(error){
        return <p style={{color: 'red'}}>{error}</p>;
    }

    return(
        <div>
            <h1>Todas las reservas</h1>
            <ul>
                {reservations.map((reserva)=>(
                    <li key={reserva.id}>
                        <strong>Reserva:{reserva.id}</strong><br/>
                        <strong>Sala: {reserva.room?.name}</strong><br/>
                        <strong>Inicio: {new Date(reserva.startTime).toLocaleString()}</strong><br/>
                        <strong>Fin: {new Date(reserva.endTime).toLocaleString()}</strong><br/>
                        <span>Estado: {reserva.status === 'active' ? '✅ Activa' : '❌ Cancelada'}</span>
                    </li>

                ))}
            </ul>
        </div>

    );
}