
import './App.css';
import './assets/css/style.css';
import Cart from './pages/Cart';
import Main from './pages/Main';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
]);

function App() {
  return (

          
      <RouterProvider router={router} />
    
  );
}

export default App;
