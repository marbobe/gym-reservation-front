import { Button } from "../ui/Button"
import type { Room } from "../../types/index.ts"
import { Badge } from "../ui/Badge.tsx";
import { useNavigate } from "react-router-dom";

export const RoomCard = ({room}: {room: Room}) => {

    const navigate = useNavigate()

    return (

        <div className="bg-white border border-neutral-200 group relative flex flex-col block">
            {/* Imagen */}
            <div className="relative h-72 w-full overflow-hidden bg-stone-100">
                <img 
                    src={room.imageUrl} 
                    alt={`Fotografía de ${room.name}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale"
                />
                {/* Badge flotante */}
                <div className="absolute top-6 right-6">
                    <Badge status={room.status}>{room.status === 'active' ? 'disponible': 'inactiva'}</Badge> 
                </div>
            </div>

            {/* Contenido Tarjeta */}
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">

                    <h3 className="font-serif text-3xl text-neutral-900 tracking-tight">{room.name}</h3>
                    <span className="font-serif text-2xl text-neutral-400 italic">{room.pricePerHour}€/h</span>
     
                </div>
                
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                    Aforo: {room.capacity} personas
                </p>

                <p className="font-sans text-neutral-500 text-sm leading-loose mb-8 flex-1">
                    {room.description}
                </p>
                
                {/* Zona de Botones */}
                <div className="pt-6 border-t border-neutral-100 mt-auto">
                    <div className="w-full flex">
                        <Button variant="secondary" className="w-full mr-8" onClick={()=> navigate(`/rooms/edit/${room.id}`)}>Editar</Button>
                        
                        <Button disabled={room.status==='deleted'} variant="primary" className="w-full" onClick={()=> navigate(`/rooms/${room.id}/reserve`)}>Reservar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}