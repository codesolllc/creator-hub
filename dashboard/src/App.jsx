import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { useSelector } from "react-redux";

function App() {
  const isLoggin = useSelector((state) => state?.isLoggin);
  

  return (
    <>
      <RouterProvider router={isLoggin ? privateRoutes : publicRoutes} />
    </>
  );
}

export default App;
