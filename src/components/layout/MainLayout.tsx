import { Outlet } from 'react-router-dom';
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
    return(
        <div className="flex min-h-screen bg-stone-50 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Outlet/>
            </main>
        </div>
    )
}