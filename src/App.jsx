import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './components/Menu'
import Home from './components/screens/Home'
import Pessoa from "./components/screens/pessoa/Pessoa";
import Pet from "./components/screens/pet/Pet";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Menu/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "pessoa",
        element : <Pessoa/>
      }
      ,
      {
        path : "pet",
        element : <Pet/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
