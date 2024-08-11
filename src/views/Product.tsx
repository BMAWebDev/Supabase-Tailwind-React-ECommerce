import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// models
import { IProductDB } from '@models/db';
// utils
import db from '@lib/db';
// components
import DefaultThumbnail from '@assets/product-thumbnail-empty.jpeg';
import LeftArrow from '@assets/icons/left-arrow.svg';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProductDB | null>(null);

  const getProduct = async (product_id: string) => {
    const { data, error } = await db
      .from('products')
      .select()
      .eq('product_id', product_id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  useEffect(() => {
    if (id) {
      getProduct(id).then((res) => {
        setProduct(res);
      });
    }
  }, [id]);

  return (
    <section className="relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
          <div className="img">
            <div className="img-box h-full max-lg:mx-auto ">
              <img
                src={product?.product_thumbnail_url || DefaultThumbnail}
                alt="Product thumbnail"
                className="max-lg:mx-auto lg:ml-auto h-screen object-cover"
              />
            </div>
          </div>
          <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
            <div className="data w-full max-w-xl">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                {product?.product_name}
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 border-gray-200 mr-5">
                  ${product?.product_price}
                </h6>
              </div>

              {product?.product_description && (
                <p className="text-gray-500 text-base font-normal mb-5">
                  {product.product_description}
                </p>
              )}

              <Link to="/" className="text-blue-700 flex gap-2 w-full">
                <img src={LeftArrow} width={24} alt="back arrow" />
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
