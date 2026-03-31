import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
 
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/rooms', label: 'Espacios' },
    { path: '/calendar', label: 'Calendario' },
    { path: '/reservations', label: 'Reservas' },
  ];

  const today = new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const handleClick = () => {
    setIsOpen(false);
  }
  
  return (
    <>
    <aside className="w-64 min-h-screen bg-neutral-950 flex flex-col border-r border-neutral-900 hidden lg:flex">
      
      {/* Logo */}
      <div className="pt-10 pb-8 px-8 border-b border-neutral-900">
        <h2 className="font-serif text-3xl text-white tracking-tight leading-none mb-6">
          Gym<span className="text-neutral-500 italic">Reservation</span>
        </h2>
         <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">
            {today}
        </p>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
        <p className="px-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-600 mb-4">
          Navegación
        </p>

        {menuItems.map((item) => {
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors font-medium
                ${isActive 
                  ? 'bg-white text-neutral-950' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mb-4">
       
      </div>

      {/* Zona del Usuario */}
      <div className="p-4 border-t border-neutral-900">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-none flex items-center justify-center text-s text-white font-serif">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white uppercase tracking-widest">Admin</span>
            <span className="text-[14px] text-neutral-500 font-serif italic">Studio Manager</span>
          </div>
        </div>
      </div>

    </aside>
    <div className='lg:hidden bg-neutral-950 '>
      <button className='text-white relative mx-auto max-w-7xl px-2' onClick={()=> setIsOpen(!isOpen)} > 
        <h2 className="font-serif text-2xl text-white tracking-tight mt-2 leading-none mb-2">
         ☰ Gym<span className="text-neutral-500 italic">Reservation</span>  
        </h2> 
      </button>
    </div>
     {isOpen && (
        <div className="lg:hidden absolute  z-80 w-full bg-white">
          <div className='lg:hidden flex flex-col'>

          {menuItems.map((item) => {
            const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleClick()}
                className={`
                  px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors font-medium text-center
                  ${isActive 
                    ? 'bg-white text-neutral-950' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
          </div>
        </div>
      )}
    </>
  );
};