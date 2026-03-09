import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";

export const CreateRoomPage =  () => {
    const navigate = useNavigate();

    const {id} =useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData ] = useState({name:"", capacity: 0, pricePerHour: 0, description: "", imageUrl: ""});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if(isEditMode){
            const fetchRoomData = async () => {
                setLoading(true);
                try{
                    const response = await fetch(`http://localhost:4000/api/v1/rooms/${id}`);

                    if (!response.ok) throw new Error("No se pudo cargar la sala");

                    const data = await response.json();

                    setFormData({
                        name: data.name || "",
                        capacity: data.capacity || 0,
                        pricePerHour: data.pricePerHour || 0,
                        description: data.description || "",
                        imageUrl: data.imageUrl || ""
                    });
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchRoomData();
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target; 
        
        setFormData({
            ...formData, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        });
    };

   const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true); 
        setError(null);
        
        try{
            const url = isEditMode 
                ? `http://localhost:4000/api/v1/rooms/${id}` 
                : 'http://localhost:4000/api/v1/rooms';
            
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al guardar el espacio."); 
            }

            navigate('/rooms');

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false); 
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/api/v1/rooms/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("Error al eliminar el espacio.");
            
            navigate('/rooms');
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            setShowDeleteConfirm(false); 
        }
    };

    if (loading && isEditMode && formData.name === "") {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">Cargando datos del espacio...</p>
            </div>
        );
    }

    return(
        <div className="p-8 md:p-16 max-w-4xl mx-auto w-full">
            <header className="border-b border-neutral-200 pb-10 mb-12">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
                    Administración
                </p>
                <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-4">
                    {isEditMode ? 'Editar Espacio' : 'Nuevo Espacio'}
                </h1>
                <p className="font-sans text-neutral-500 text-lg font-light">
                    {isEditMode ? 'Modifica las características de esta sala.' : 'Define las características, estilo y capacidad de la nueva sala.'}
                </p>
            </header>
            
            {error && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-900 font-sans text-sm">
                    {error}
                </div>
            )}

            {/* Banner de Confirmación Eliminar */}
            {showDeleteConfirm && (
                <div className="mb-8 p-6 bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h4 className="font-serif text-xl text-neutral-900">¿Estás seguro?</h4>
                        <p className="font-sans text-sm text-neutral-500">Esta acción no se puede deshacer y borrará permanentemente la sala.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
                        <Button variant="danger" onClick={handleDelete} disabled={loading}>Sí, Eliminar</Button>
                    </div>
                </div>
            )}

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

                    <div className="mt-16 flex md:flex-row justify-between gap-4">
                       <div>
                        {isEditMode && (

                            <Button 
                                type="button" 
                                variant="danger" 
                                disabled={loading}
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Eliminar Espacio
                            </Button>
                        )}
                    </div>

                        <Button type="submit" disabled={loading}>{loading ? 'Creando espacio...' : 'Guardar Espacio'}</Button>
                    </div>
            </form>
        </div>
    );
}