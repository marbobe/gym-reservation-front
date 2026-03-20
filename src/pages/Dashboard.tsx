import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"


export const Dashboard = () => {
    return(
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
            <header className="border-b border-neutral-200 pb-10 mb-8">
                <h1 className="font-serif text-5xl tracking-tight text-neutral-900 mb-2">
                    GymReservation
                </h1>
                <p className="font-sans text-neutral-500 text-lg mt-4 font-light">
                    Bienvenido al alquiler de espacios de Gimnasio
                </p>
            </header>

            <Button variant="danger">Boton danger</Button>
            <Button>Boton principal</Button>
            <Button variant="secondary">Boton Secondary</Button>

            <Badge>Hola</Badge>
            <Badge status="deleted">Adios</Badge>


                <div className="min-h-screen bg-stone-50 p-8 md:p-16 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* === CABECERA EDITORIAL === */}
        <header className="border-b border-neutral-200 pb-12 pt-8">
          <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-neutral-900 leading-tight">
            GymReserve. <br className="hidden md:block"/>
            <span className="text-neutral-400 italic">Estudio & Movimiento</span>
          </h1>
          <p className="text-neutral-500 mt-8 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Un sistema de diseño basado en el minimalismo extremo, la luz natural y la pureza geométrica. Pensado para espacios premium.
          </p>
        </header>

        {/* === 1. PALETA DE COLORES (Refinada y Luminosa) === */}
        <section>
          <h2 className="font-sans text-xs uppercase tracking-[0.2em] mb-8 text-neutral-400 font-semibold">01. Colores Base</h2>
          <div className="flex flex-wrap gap-0 border border-neutral-200 bg-white">
            <div className="w-40 h-40 bg-neutral-950 flex flex-col justify-between p-4 text-white">
              <span className="text-xs uppercase tracking-widest opacity-50">#0A0A0A</span>
              <span className="font-serif text-xl tracking-tight">Tinta</span>
            </div>
            <div className="w-40 h-40 bg-white border-l border-neutral-200 flex flex-col justify-between p-4 text-neutral-900">
              <span className="text-xs uppercase tracking-widest opacity-50">#FFFFFF</span>
              <span className="font-serif text-xl tracking-tight">Luz</span>
            </div>
            <div className="w-40 h-40 bg-stone-50 border-l border-neutral-200 flex flex-col justify-between p-4 text-neutral-900">
              <span className="text-xs uppercase tracking-widest opacity-50">#FAFAF9</span>
              <span className="font-serif text-xl tracking-tight">Piedra</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* === 2. TARJETA DE SALA (Protagonismo Fotográfico) === */}
          <section className="lg:col-span-7">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] mb-8 text-neutral-400 font-semibold">02. Componente de Espacio</h2>
            
            {/* Tarjeta: Borde sutil, fondo blanco puro, interacciones suaves */}
            <div className="bg-white border border-neutral-200 group relative">
              
              {/* Imagen: Protagonista absoluta. Altura dramática (h-96) */}
              <div className="relative h-96 w-full overflow-hidden bg-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sala de Yoga"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                />
                
                {/* Badge Flotante: Estilo etiqueta de museo */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 border border-neutral-200">
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-900">
                    Disponible
                  </span>
                </div>
              </div>
              
              {/* Contenido: Mucho aire (padding 10) */}
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-serif text-4xl text-neutral-900 tracking-tight mb-2">Sala Zen</h3>
                    <p className="font-sans text-sm uppercase tracking-widest text-neutral-400">Cuerpo y Mente</p>
                  </div>
                  <span className="font-serif text-2xl text-neutral-300 italic">01</span>
                </div>
                
                <p className="font-sans text-neutral-500 text-base leading-loose max-w-md mb-10 font-light">
                  Un santuario inundado de luz natural, diseñado específicamente para prácticas de meditación profunda y yoga restaurativo. Suelo de roble macizo y aislamiento acústico total.
                </p>
                
                {/* Botones: Contraste máximo, bordes afilados */}
                <div className="flex flex-col sm:flex-row gap-4 border-t border-neutral-100 pt-8">
                  <button className="flex-1 bg-neutral-950 text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors">
                    Agendar Sesión
                  </button>
                  <button className="px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-900 transition-colors">
                    Ver Galería
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* === 3. ESTILOS DE FORMULARIO (Alta Costura) === */}
          <section className="lg:col-span-5">
             <h2 className="font-sans text-xs uppercase tracking-[0.2em] mb-8 text-neutral-400 font-semibold">03. Interacción</h2>
             
             <div className="bg-white p-10 border border-neutral-200 space-y-10">
               <div>
                  <h3 className="font-serif text-2xl mb-2 text-neutral-900">Nueva Reserva</h3>
                  <p className="text-neutral-500 text-sm font-light">Complete los detalles para asegurar su espacio.</p>
               </div>

               <div className="space-y-8">
                 <div className="relative">
                   <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                     Identificador del Miembro
                   </label>
                   {/* Input: Borde inferior solamente (estilo formulario clásico en papel) */}
                   <input 
                      type="text" 
                      placeholder="Ej. MBR-2049" 
                      className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-lg focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors placeholder:font-sans placeholder:text-sm placeholder:text-neutral-300" 
                   />
                 </div>

                 <div className="relative">
                   <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                     Horario Preferente
                   </label>
                   <select className="w-full bg-transparent border-0 border-b border-neutral-200 px-0 py-2 text-neutral-900 font-serif text-lg focus:outline-none focus:ring-0 focus:border-neutral-950 transition-colors appearance-none">
                      <option>Mañana (07:00 - 12:00)</option>
                      <option>Tarde (12:00 - 18:00)</option>
                      <option>Noche (18:00 - 22:00)</option>
                   </select>
                 </div>
               </div>
               
               <button className="w-full bg-neutral-950 text-white px-8 py-5 font-sans text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors mt-4">
                  Confirmar Espacio
               </button>
             </div>
          </section>

        </div>
      </div>
    </div>
        </div>
    )
}