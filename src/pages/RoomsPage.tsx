import { useRooms } from "../hooks/useRooms"
import { Button } from "../components/ui/Button";
import { RoomCard } from "../components/features/RoomCard";
import { useNavigate } from "react-router-dom";

export const RoomsPage = () => {

    const { rooms, loading, error } = useRooms();
    const navigate = useNavigate();

    if(loading){
        return (
          <div className="flex justify-center items-center h-full">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">Cargando espacios...</p>
          </div>
        );
    }
    if(error){
        return <p className="text-rose-900 bg-rose-50 p-4 border border-rose-200">{error}</p>;
    }


    return(
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
            {/* Cabecera Editorial */}
            <header className="flex justify-between items-end border-b border-neutral-200 pb-8 mb-12">
                <div>
                    <h1 className="font-serif text-5xl tracking-tight text-neutral-900">Nuestros Espacios</h1>
                    <p className="font-sans text-neutral-500 mt-4 text-lg font-light">
                        Ambientes diseñados para el rendimiento y la calma.
                    </p>
                </div>
                <Button variant="secondary" onClick={()=> navigate('/rooms/new')}>Nuevo Espacio</Button>
            </header>

            {/* Grid */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {rooms.map((sala)=> (
                    <RoomCard key={sala.id} room={sala}/>
                ))}
            </ul>

            
        </div>

    )
}