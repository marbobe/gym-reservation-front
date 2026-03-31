import { BrowserRouter,Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { RoomsPage } from "./pages/RoomsPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import { CreateRoomPage } from "./pages/CreateRoomPage";
import { CreateReservationPage } from "./pages/CreateReservationPage";
import { Calendario } from "./pages/Calendario"
import { Dashboard } from "./pages/Dashboard";


function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard/>}/>

            {/* Rutas de Salas */}
            <Route path="rooms" element={<RoomsPage/>}/>
            <Route path="rooms/new" element={<CreateRoomPage/>}/>
            <Route path="rooms/:id/edit" element={<CreateRoomPage/>}/>

            {/* Rutas de Reservas */}
            <Route path="reservations" element={<ReservationsPage/>} />
            <Route path="/reservations/new" element={<CreateReservationPage />} />
            <Route path="rooms/:id/reserve" element={<CreateReservationPage />} />
            <Route path="reservations/:id/edit" element={<CreateReservationPage />} />

            <Route path="calendar" element={<Calendario/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App