import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useReservations } from "../hooks/useReservations";
import { useMemo, useState } from "react";
import { useRooms } from "../hooks/useRooms";
import { databaseService } from "../services/database.service";

export const Dashboard = () => {

    const navigate = useNavigate();

    const [isReseting, setIsReseting] = useState<boolean>(false);

    const {reservations, loading, error } = useReservations();
    const {rooms} = useRooms();

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
            totoal: maxReservas
        }
    }, [reservations, rooms])

    const proximasReservas = useMemo(()=>{

        const ahora = new Date();

        return reservations    
            .filter(reserva => new Date(reserva.startTime)> ahora && reserva.status === 'active')
            .sort((a, b)=> new Date(a.startTime).getTime() - new Date(b.endTime).getTime())
            .slice(0,3)

    }, [reservations])

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

    if(loading){
        return (
          <div className="flex justify-center items-center h-full">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">Cargando...</p>
          </div>
        );
    }

    if(error){
       return <p className="text-rose-900 bg-rose-50 p-4 border border-rose-200">{error}</p>;
    }

    return(
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">

            <header className="border-b border-neutral-200 pb-12 mb-12 grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-6">
              
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="max-w-4xl">
                  <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-neutral-900 leading-tight mb-6">
                      Gym<span className="text-neutral-500 italic">Reservation</span>
                  </h1>
                  <div className="space-y-6">
                      <p className="text-neutral-600 text-lg md:text-xl font-light leading-relaxed">
                          Bienvenido a GymReservation, una API diseñada para la gestión de espacios deportivos. 
                      </p>
                  </div>
                </div>
              </div>
                
              <div className="lg:col-span-3 flex flex-col justify-between space-y-8">
                
                  <div className="border-l-2 border-rose-200 pl-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-rose-600 font-bold mb-2">
                          Entorno de Pruebas
                      </p>
                      <p className="text-s text-neutral-500 font-light mb-4">
                          Devuelve la API a su estado original de forma segura.
                      </p>
                      <Button disabled={isReseting} variant="danger" onClick={handleResetDatabase}>
                          {isReseting ? `Restableciendo...` : `Restablecer BBDD`}
                      </Button>
                  </div>
              </div>

              <div className="lg:col-span-10 flex flex-col justify-between ">
                <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm bg-white">
                    <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-900 font-bold mb-3">
                        Arquitectura y Stack Tecnológico
                    </h2>
                    <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed mb-4">
                        Plataforma Full-Stack desarrollada con <strong className="font-medium text-neutral-900">React 18</strong> y <strong className="font-medium text-neutral-900">TypeScript</strong> en el cliente, respaldada por un backend robusto en <strong className="font-medium text-neutral-900">Node.js</strong> y <strong className="font-medium text-neutral-900">Express</strong>. La gestión de datos se realiza de forma segura y eficiente utilizando <strong className="font-medium text-neutral-900">MySQL</strong> junto con <strong className="font-medium text-neutral-900">Prisma ORM</strong>.
                    </p>
                    <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
                        El núcleo del proyecto es una API REST profesional para la gestión de reservas. Ha sido diseñada bajo una estricta <strong className="font-medium text-neutral-900">Arquitectura por Capas</strong>, garantizando escalabilidad, separación de responsabilidades y código limpio (Clean Code). Además, cuenta con documentación interactiva integrada mediante <strong className="font-medium text-neutral-900">Swagger</strong>.
                    </p>
                </div>
              </div>

            </header>

          <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-neutral-200 pb-10 mb-12 gap-8 md:gap-0">
                
                {/* panel de control */}
                <div className="max-w-2xl">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
                        Visión General
                    </p>
                    <h2 className="font-serif text-5xl tracking-tight text-neutral-900 mb-4">
                        Panel de Control
                    </h2>
                    <p className="font-sans text-neutral-500 text-lg font-light leading-relaxed">
                        Supervisa el rendimiento de los espacios, analiza las métricas clave y gestiona las sesiones en tiempo real.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/rooms/new">
                        <Button>Añadir Espacio</Button>
                    </Link>
                    <Link to="/reservations/new">
                        <Button >Nueva Reserva</Button>
                    </Link>
                </div>
                
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* PROXIMAS RESERVAS */}
                <div className="p-0 md:p-6 bg-transparent md:bg-white md:border border-neutral-200 overflow-x-auto">
                    <div className="flex justify-between items-baseline mb-6 border-b border-neutral-200 pb-4">
                        <h2 className="font-serif text-3xl text-neutral-900">Próximas Reservas</h2>
                        <Link to="/calendar" className="text-[10px] uppercase tracking-[0.1em] text-neutral-500 hover:text-neutral-900 transition-colors font-bold">
                            Ver calendario →
                        </Link>
                    </div>

                    <div className="flex flex-col gap-0">
                    {proximasReservas.map((reserva) => {

                        const nombreSala = reserva.room?.name;

                        const fechaObj = new Date(reserva.startTime);
                        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                        const horaInicio = new Date(reserva.startTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                        const horaFin = new Date(reserva.endTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})


                        return(
                            <div 
                                key={reserva.id}
                                onClick={()=> navigate(`/reservations/${reserva.id}/edit`)}  
                                className="group flex flex-col md:flex-row md:items-center py-5 border-b border-neutral-100 hover:bg-neutral-100 transition-colors px-2 cursor-pointer"
                                >
                                <div className="w-32 mb-2 md:mb-0 flex-1">
                                    <p className="text-neutral-900 font-medium">{fechaFormateada} de {horaInicio} - {horaFin}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="font-serif text-xl text-neutral-900 ">{nombreSala}</p>
                                    <p className="text-sm text-neutral-500 font-light mt-1">Usuario #{reserva.userId}</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Badge>{reserva.status}</Badge>
                                </div>
                            </div>
                        )
                    })}
                        

                    </div>
                </div>

                {/* ESTADISTICAS */}
                <div className="p-0 md:p-6 bg-transparent md:bg-white md:border border-neutral-200 overflow-x-auto">
                    <div className="mb-6 border-b border-neutral-200 pb-4">
                        <h2 className="font-serif text-3xl text-neutral-900">Resumen</h2>
                    </div>

                    <div className="flex flex-col gap-8 mt-6">
                        {/* SALA MAS RESERVADA */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                          <div>
                             <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                                Sala más demandada
                            </p>
                            <p className="font-serif text-4xl text-neutral-900">{salaMasDemandada?.nombre}</p>
                          </div>
                           <p className="text-sm text-neutral-500 font-light">
                                {salaMasDemandada?.totoal} reservas este mes
                            </p>
                        </div>

                        {/* RESERVAS HOY */}
                        <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                                Reservas para hoy
                            </p>
                            <p className="font-serif text-4xl text-neutral-900">{estadisticasHoy.total}</p>
                          </div>
                            <p className="text-sm text-neutral-500 font-light">
                                {estadisticasHoy.activas} activas, {estadisticasHoy.canceladas} canceladas
                            </p>
                        </div>

                        {/* HORAS TOTALES */}
                        <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                                Horas reservadas
                            </p>
                            <p className="font-serif text-4xl text-neutral-900">{totalHorasReservadas}</p>
                          </div>
                            <p className="text-sm text-neutral-500 font-light">
                                Volumen total histórico
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};