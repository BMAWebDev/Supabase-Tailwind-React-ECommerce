import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// models
import { IProductDB } from '@models/db';
// utils
import db from '@lib/db';
import { getIsLoggedIn } from '@utils/auth';
// components
import DefaultProductThumbnail from '@assets/product-thumbnail-empty.jpeg';
import DeleteIcon from '@assets/icons/delete.svg';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProductDB[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (products.length === 0) {
      getProducts()
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => console.log(err));
    }
  }, [products]);

  useEffect(() => {
    if (!isLoggedIn) {
      getIsLoggedIn().then((res) => {
        setIsLoggedIn(res);
      });
    }
  }, [isLoggedIn]);

  const getProducts = async (): Promise<IProductDB[]> => {
    const { data, error } = await db.from('products').select('*');

    if (error) throw new Error(error.message);

    return data;
  };

  const deleteProduct = async (productID: number) => {
    const isDeleteConfirmed = confirm(
      `Are you sure you want to delete product ${
        products.find((prod) => prod.product_id === productID)?.product_name ||
        `product with ID ${productID}`
      }`,
    );

    if (isDeleteConfirmed) {
      const { error } = await db
        .from('products')
        .delete()
        .eq('product_id', productID);

      if (error) {
        throw new Error(error.message);
      }

      setTimeout(() => {
        navigate(0);
      }, 10000);
    }
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-sm:text-center flex justify-between w-full">
          Products list
          <Link to="/add-product" className="text-blue-700">
            Add product
          </Link>
        </h2>

        <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product.product_id}`}
              key={product.product_id}
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
                      deleteProduct(product.product_id);
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
                    {product.product_name}
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
