import { Link } from 'react-router-dom';
import { useState } from 'react';
// utils
import { getIsLoggedIn } from '@utils/auth';
// components
import DefaultProductThumbnail from '@assets/product-thumbnail-empty.jpeg';
import DeleteIcon from '@assets/icons/delete.svg';

const Products = () => {
  const products = [
    {
      id: 1,
      product_title: 'name 1',
      product_description: 'halo',
      product_price: 100,
      product_stock_qty: 150,
      product_thumbnail_url:
        'https://media.istockphoto.com/id/471928894/ro/fotografie/p%C4%83un.jpg?s=1024x1024&w=is&k=20&c=tzlg7igAOUq8A6F-u4VabwKmJBSzDhWqtsvuWfbMYyY=',
    },
    {
      id: 2,
      product_title: 'name 2',
      product_description: 'halo',
      product_price: 100,
      product_stock_qty: 150,
    },
    {
      id: 3,
      product_title: 'name 3',
      product_description: 'halo',
      product_price: 100,
      product_stock_qty: 150,
      product_thumbnail_url:
        'https://media.istockphoto.com/id/490576879/ro/fotografie/texas-exotice.jpg?s=1024x1024&w=is&k=20&c=DRgbkd-CC0d6ktKvoEGe-PtUJCO73tbJ1zFqvMYKUII=',
    },
    {
      id: 4,
      product_title: 'name 4',
      product_description: 'halo',
      product_price: 100,
      product_stock_qty: 150,
    },
  ];

  const [prods, setProds] = useState(products);

  const isLoggedIn = getIsLoggedIn();

  const deleteProduct = (productID: number) => {
    const indexToDelete = prods.map((product) => product.id).indexOf(productID);

    setProds((prev) => {
      const newProds = JSON.parse(JSON.stringify(prev));
      newProds.splice(indexToDelete, 1);

      return newProds;
    });
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-sm:text-center">
          Products list
        </h2>

        <div className="flex justify-center gap-4 max-sm:flex-col">
          {prods.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product m-0 group cursor-pointer bg-white transition-all duration-500 basis-1/2"
            >
              <div className="relative">
                <img
                  src={product.product_thumbnail_url || DefaultProductThumbnail}
                  alt="product thumbnail"
                  className="w-full aspect-square rounded-2xl"
                />

                {isLoggedIn && (
                  <div
                    className="delete-container absolute top-0 right-0 bg-slate-200 rounded-2xl p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProduct(product.id);
                    }}
                  >
                    <img
                      src={DeleteIcon}
                      alt="delete icon"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                    {product.product_title}
                  </h6>
                  <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                    ${product.product_price}
                  </h6>
                </div>
                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                  {product.product_description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
