import { useMemo } from "react";
import { useReservations } from "./useReservations";
import { useRooms } from "./useRooms";
import { useState } from "react";
import { databaseService } from "../services/database.service";


export const useDashboardStats = () =>{
    const {reservations, loading: loadingRes, error: errorRes } = useReservations();
    const {rooms, loading: loadingRooms, error: errorRooms} = useRooms();

    const isLoading = loadingRes || loadingRooms;
    const hasError = errorRes || errorRooms;

    const [isReseting, setIsReseting] = useState<boolean>(false);

    const handleResetDatabase = async ()=>{
        const confirmacion = window.confirm("¿Estás absolutamente seguro de que quieres borrar todos los datos y reiniciar la BBDD? Esta acción no se puede deshacer.");
        if (!confirmacion) {
            return; 
        }
        
        try{
            setIsReseting(true);
            await databaseService.reset();
            window.location.reload();
        } catch (err){
            console.error("Error en el reset:", err);
            alert('Hubo un error al resetear la base de datos. Revisa la consola.');
        }finally{
            setIsReseting(false);
        }
    }

    const totalHorasReservadas = useMemo(() => {
            if(!reservations) return 0;
            
            let totalMilisegundos = 0;

            reservations
                .filter(reserva => reserva.status === "active")
                .forEach(reserva => {
                    const inicio = new Date(reserva.startTime);
                    const fin = new Date(reserva.endTime);
                    
                    const duracionMilisegundos = fin.getTime() - inicio.getTime();

                    totalMilisegundos += duracionMilisegundos;
                });
                
            const horasTotales = totalMilisegundos / (1000 * 60 *60);

            return Math.round(horasTotales)
            
        }, [reservations]
    );

    const estadisticasHoy = useMemo(()=>{
        if(!reservations) return {total: 0, activas: 0, canceladas: 0}

        const hoyString = new Date().toDateString();
        let total = 0;
        let activas = 0;
        let canceladas =0;

        reservations
            .forEach(reserva => {
                const fechReservaString = new Date(reserva.startTime).toDateString();

                if(fechReservaString === hoyString){
                    total++;

                    if (reserva.status === "active"){
                        activas ++;
                    } else if (reserva.status === "cancelled"){
                        canceladas++;
                    }
                }
            })

            return{ total, activas, canceladas}

    }, [reservations]);

    const salaMasDemandada = useMemo(()=> {
        if(!reservations || !rooms) return null;

        const conteoSalas: Record<number,number> = {};

        reservations.forEach(reserva => {
                const id =reserva.roomId;
                conteoSalas[id] = (conteoSalas[id] || 0)+1;
        });
    
        let maxReservas = 0;
        let salaMasReservada: number| null = null;

        Object.entries(conteoSalas).forEach(([idSala, totalVotos]) =>{
                if(totalVotos > maxReservas){
                    maxReservas = totalVotos;
                    salaMasReservada = Number(idSala);
                }
            });

        const salaEncontrada = rooms.find(room => room.id === salaMasReservada);

        return {
            nombre: salaEncontrada ? salaEncontrada.name : "Desconocida",
            total: maxReservas
        }
    }, [reservations, rooms])

    const proximasReservas = useMemo(()=>{

        const ahora = new Date();

        return reservations    
            .filter(reserva => new Date(reserva.startTime)> ahora && reserva.status === 'active')
            .sort((a, b)=> new Date(a.startTime).getTime() - new Date(b.endTime).getTime())
            .slice(0,3)

    }, [reservations])

    return {loading: isLoading, error: hasError, totalHorasReservadas, estadisticasHoy, salaMasDemandada, proximasReservas, isReseting, handleResetDatabase }
}