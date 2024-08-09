import type { RouteObject } from "react-router-dom";
// pages
import AddProduct from "@views/AddProduct";
import Products from "@views/Products";

const routes: RouteObject[] = [
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/",
    element: <Products />,
  },
];

export default routes;
