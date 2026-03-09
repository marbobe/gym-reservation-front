import { useState } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export const CreateRoomPage =  () => {

    const [formData, setFormData ] = useState({name:"", capacity: 0, pricePerHour: 0, description: "", imageUrl: ""});

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target; 
        
        setFormData({
            ...formData, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 

        setLoading(true); 
        setError(null);
        
        try{
            const response = await fetch('http://localhost:4000/api/v1/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if(loading){
        return (
            <div className="flex justify-center items-center h-full">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">Cargando espacios...</p>
            </div>
        );
    }
            if (!response.ok) {
                return <p className="text-rose-900 bg-rose-50 p-4 border border-rose-200">{error}</p>;
            }

            const newRoom = await response.json();
            console.log("¡Espacio creado en backend!", newRoom);

            navigate('/rooms');

        } catch (error: any) {
            console.error("Error en la petición:", error);
            setError(error.message);
        } finally {
            setLoading(false); 
        }
    };

    return(
        <div className="p-8 md:p-16 max-w-4xl mx-auto w-full">
            <header className="border-b border-neutral-200 pb-10 mb-12">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
                    Administración
                </p>
                <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-4">
                    Nuevo Espacio
                </h1>
                <p className="font-sans text-neutral-500 text-lg font-light">
                    Define las características, estilo y capacidad de la nueva sala.
                </p>
            </header>
            
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div className="md:col-span-2 relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Nombre del Espacio
                        </label>   
                        <input name="name" type="text" placeholder="Ej. Sala de Boxeo" value={formData.name} onChange={handleChange} required 
                        className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-xl focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:font-sans placeholder:text-lg placeholder:text-neutral-300"/>
                    </div>

                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Aforo Máximo
                        </label>   
                        <input name="capacity" type="number" min="1" placeholder="Ej: 20" value={formData.capacity || ""} onChange={handleChange} required
                        className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-xl focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:font-sans placeholder:text-base placeholder:text-neutral-300"/>
                    </div>   

                    <div className="relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Precio por Hora (€)
                        </label>
                        <input name="pricePerHour" min="0" step="0.5" type="number" placeholder="Ej: 27.00€" value={formData.pricePerHour || ""} onChange={handleChange} required
                        className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-xl focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:font-sans placeholder:text-base placeholder:text-neutral-300"/>
                    </div>

                    <div className="md:col-span-2 relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            Descripción Breve
                        </label>
                        <input name="description" type="text" placeholder="Ej. Espacio amplio con suelo acolchado y equipamiento de boxeo" value={formData.description} onChange={handleChange} 
                        className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:text-neutral-300"/>
                    </div>    

                    <div className="md:col-span-2 relative">
                        <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                            URL de la Fotografía
                        </label>
                        <input name="imageUrl" type="text" placeholder="Ej. https://unsplash.com/es/..." value={formData.imageUrl} onChange={handleChange} 
                        className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-500 font-sans text-base focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:text-neutral-300"/>
                    </div>
                </div>

                    <div className="mt-16 flex justify-end">
                        <Button type="submit" disabled={loading}>{loading ? 'Creando espacio...' : 'Guardar Espacio'}</Button>
                    </div>
            </form>
        </div>
    );
}