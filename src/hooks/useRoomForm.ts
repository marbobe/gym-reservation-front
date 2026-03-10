import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoomService } from "../services/room.service";

export interface RoomFormData{
    name: string,
    capacity: number;
    pricePerHour: number;
    description: string;
    imageUrl: string;
    status: string; 
}

export const useRoomForm = (id:string | undefined) => {
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData ] = useState<RoomFormData>({name:"", capacity: 0, pricePerHour: 0, description: "", imageUrl: "", status:"active"});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if(isEditMode && id){
            const loadRoom = async () => {
                setLoading(true);
                try{
                    const data = await RoomService.getById(id);
                    setFormData({
                        name: data.name || "",
                        capacity: data.capacity || 0,
                        pricePerHour: data.pricePerHour || 0,
                        description: data.description || "",
                        imageUrl: data.imageUrl || "",
                        status: data.status || "active"
                    });
                } catch (err: any) {
                    setError("No se pudo cargar la sala. " + (err.message || ""));
                } finally {
                    setLoading(false);
                }
            };
            loadRoom();
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target; 
        
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        }));
    };

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true); 
        setError(null);
        
        try{
            const payload = {
                ...formData,
                status: formData.status as 'active' | 'deleted'
            };

            if (isEditMode && id){
                await RoomService.update(id, payload);
            }else {
                await RoomService.create(payload)
            }
            navigate('/rooms');

        } catch (error: any) {
            setError("Error al guardar el espacio. " + (error.message || ""));
        } finally {
            setLoading(false); 
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        setLoading(true);
        const newStatus = formData.status === 'deleted' ? 'active' : 'deleted';

        try {
            await RoomService.toggleStatus(id, newStatus);            
            navigate('/rooms');
        } catch (error: any) {
            setError("Error al cambiar el estado del espacio. " + (error.message || ""));
            setLoading(false);
        }
    };

    return{ formData, loading, error, isEditMode, handleChange, handleSubmit, handleDelete};
};