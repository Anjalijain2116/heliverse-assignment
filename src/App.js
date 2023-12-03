import './App.css';
import Render from './components/Render';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from './components/User';

function App() {
  return (
    <div className="App">

      {/* Add routing */}

      <RouterProvider router={approuter} />
     </div>
  );
}

// Adding paths for routing

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Render />,
    // errorElement: <Error />,
  },
  {
    path: "/user",
    element: <User />,
    // errorElement: <Error />,
  },
]);
export default App;
