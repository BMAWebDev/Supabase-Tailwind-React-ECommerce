import type { RouteObject } from 'react-router-dom';
// pages
import AddProduct from '@views/AddProduct';
import Products from '@views/Products';
import Product from '@views/Product';

const routes: RouteObject[] = [
  {
    path: '/add-product',
    element: <AddProduct />,
  },
  {
    path: '/',
    element: <Products />,
  },
  {
    path: '/product/:id',
    element: <Product />,
  },
];

export default routes;
