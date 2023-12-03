
import './App.css';

import Render from './components/Render';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from './components/User';
// import Createteam from './components/Createteam';
// import Child from './components/ChildComponent'

function App() {
  return (
    <div className="App">

      <RouterProvider router={approuter} />
      {/* <Child /> */}
      
    
    </div>
  );
}

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
  // {
  //   path: "/createteam",
  //   element: <Createteam />,
  //   // errorElement: <Error />,
  // },
 
]);


export default App;
