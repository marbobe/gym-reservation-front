import { BrowserRouter,Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { RoomsPage } from "./pages/RoomsPage";
import { ReservationsPage } from "./pages/ReservationsPage";

const Dashboard = () => <h1 className="text-2xl font-bold">Bienvenido al alquiler de espacios de Gimnasio</h1>;



function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard/>}/>
            <Route path="rooms" element={<RoomsPage/>}/>
            <Route path="reservations" element={<ReservationsPage/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App