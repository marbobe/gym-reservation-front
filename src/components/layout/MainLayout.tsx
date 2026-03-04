import { Fragment } from "react";
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, DoorOpen, CalendarDays } from 'lucide-react';

export const MainLayout = () => {
    return(
        <Fragment>
            {/* Sidebar */}
            <aside>
                <div>Gym reservation </div>
                <nav>
                    <Link to="/">
                        <LayoutDashboard size={20}>Dashboard</LayoutDashboard>
                    </Link>
                    <Link to="/rooms">
                        <DoorOpen size={20}>Salas</DoorOpen>
                    </Link>
                    <Link to="/reservations">
                        <CalendarDays size={20}>Reservas</CalendarDays>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main>
                <div>
                    <Outlet/>
                </div>
            </main>
        </Fragment>
    )
}