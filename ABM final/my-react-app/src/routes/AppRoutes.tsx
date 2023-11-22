import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage";
import { Stock } from "../pages/Stock";
import { Articulos } from "../pages/Articulos";
//import HomePage from "../pages/HomePage"
//import Componentes from "../pages/Componentes"


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Stock' element={<Stock/>}/>
        <Route path='/Articulos' element={<Articulos/>}/>


    </Routes>
  )
}

export default AppRoutes;