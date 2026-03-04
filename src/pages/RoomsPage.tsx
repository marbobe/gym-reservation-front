import { useRooms } from "../hooks/useRooms"

export const RoomsPage = () => {

    const { rooms, loading, error } = useRooms();

    if(loading){
        return <p> Cargando salas...</p>
    }
    if(error){
        return <p style={{color: 'red'}}>{error}</p>;
    }


    return(
        <div>
            <h1>Nuestras salas</h1>
            <ul>
                {rooms.map((sala)=> (
                    <li key={sala.id}>
                        {sala.name} - capacidad: {sala.capacity} personas
                    </li>
                ))}
            </ul>
        </div>

    )
}