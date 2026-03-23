import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const Dashboard = () => {

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
                      <Button variant="danger">
                          Restablecer BBDD
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
                
                {/* Textos */}
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

                {/* Botones de Acción */}
                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/rooms/new">
                        <Button>Añadir Espacio</Button>
                    </Link>
                    <Link to="/reservations/new">
                        <Button >Nueva Reserva</Button>
                    </Link>
                </div>
                
            </div>

            {/* 2. CUERPO PRINCIPAL (GRID) - Sin cambios estructurales, solo ajustes de espaciado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                
                {/* COLUMNA IZQUIERDA: Próximas Reservas */}
                <div className="p-0 md:p-6 bg-transparent md:bg-white md:border border-neutral-200 overflow-x-auto">
                    <div className="flex justify-between items-baseline mb-6 border-b border-neutral-200 pb-4">
                        <h2 className="font-serif text-3xl text-neutral-900">Próximas Reservas</h2>
                        <Link to="/calendar" className="text-[10px] uppercase tracking-[0.1em] text-neutral-500 hover:text-neutral-900 transition-colors font-bold">
                            Ver calendario →
                        </Link>
                    </div>

                    <div className="flex flex-col gap-0">
                        {/* Fila 1 */}
                        <div className="group flex flex-col md:flex-row md:items-center py-5 border-b border-neutral-100 hover:bg-neutral-50 transition-colors px-2">
                            <div className="w-32 mb-2 md:mb-0">
                                <p className="text-neutral-900 font-medium">10:00 - 11:30</p>
                            </div>
                            <div className="flex-1">
                                <p className="font-serif text-xl text-neutral-900 group-hover:text-rose-900 transition-colors">Sala de Baile</p>
                                <p className="text-sm text-neutral-500 font-light mt-1">Usuario #101</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Badge>En curso</Badge>
                            </div>
                        </div>

                        {/* Fila 2 */}
                        <div className="group flex flex-col md:flex-row md:items-center py-5 border-b border-neutral-100 hover:bg-neutral-50 transition-colors px-2">
                            <div className="w-32 mb-2 md:mb-0">
                                <p className="text-neutral-500 font-light">14:00 - 15:30</p>
                            </div>
                            <div className="flex-1">
                                <p className="font-serif text-xl text-neutral-900 group-hover:text-rose-900 transition-colors">Ring de Boxeo</p>
                                <p className="text-sm text-neutral-500 font-light mt-1">Usuario #104</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Badge status="active">Pendiente</Badge>
                            </div>
                        </div>

                        {/* Fila 3 */}
                        <div className="group flex flex-col md:flex-row md:items-center py-5 border-b border-neutral-100 hover:bg-neutral-50 transition-colors px-2">
                            <div className="w-32 mb-2 md:mb-0">
                                <p className="text-neutral-400 font-light line-through">18:00 - 19:00</p>
                            </div>
                            <div className="flex-1">
                                <p className="font-serif text-xl text-neutral-400">Sala de Pilates</p>
                                <p className="text-sm text-neutral-400 font-light mt-1">Usuario #102</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Badge status="deleted">Cancelada</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Estadísticas */}
                <div className="p-0 md:p-6 bg-transparent md:bg-white md:border border-neutral-200 overflow-x-auto">
                    <div className="mb-6 border-b border-neutral-200 pb-4">
                        <h2 className="font-serif text-3xl text-neutral-900">Resumen</h2>
                    </div>

                    <div className="flex flex-col gap-8 mt-6">
                        {/* Estadística 1 */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                          <div>
                             <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                                Sala más demandada
                            </p>
                            <p className="font-serif text-4xl text-neutral-900">Sala de Baile</p>
                          </div>
                           <p className="text-sm text-neutral-500 font-light">
                                45 reservas este mes
                            </p>
                        </div>

                        {/* Estadística 2 */}
                        <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                                Reservas para hoy
                            </p>
                            <p className="font-serif text-4xl text-neutral-900">8</p>
                          </div>
                            <p className="text-sm text-neutral-500 font-light">
                                2 activas, 6 pendientes
                            </p>
                        </div>

                        {/* Estadística 3 */}
                        <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                                Horas reservadas
                            </p>
                            <p className="font-serif text-4xl text-neutral-900">124 h</p>
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