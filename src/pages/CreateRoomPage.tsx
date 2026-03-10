import { Button } from "../components/ui/Button";
import { useParams } from "react-router-dom";
import { useRoomForm } from "../hooks/useRoomForm";

export const CreateRoomPage =  () => {

    const {id} =useParams();

    const { formData, loading, error, isEditMode, handleChange, handleSubmit, handleDelete} = useRoomForm(id);
   

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
                                onClick={() => handleDelete()}
                            >
                                {formData.status === 'deleted'? 'Habilitar Sala' : 'Deshabilitar Sala'}
                            </Button>
                        )}
                    </div>

                        <Button type="submit" disabled={loading}>
                            {loading 
                                ? (isEditMode ? 'Guardando...' : 'Creando sala...') 
                                : (isEditMode ? 'Guardar Cambios' : 'Guardar Sala')
                            }
                        </Button>
                    </div>
            </form>
        </div>
    );
}