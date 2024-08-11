import { useState } from 'react';
// services
import db from '@lib/db';
// utils
import { getIsLoggedIn } from 'utils/auth';
// components
import LeftArrow from '@assets/icons/left-arrow.svg';
import { Link } from 'react-router-dom';

interface AddProductData {
  product_name: string;
  product_stock_qty: number;
  product_price: number;
  product_description?: string;
}

const AddProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getIsLoggedIn());

  const [name, setName] = useState('');
  const [stockQty, setStockQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');

  const addProduct = async (data: AddProductData) => {
    const {
      product_name,
      product_price,
      product_stock_qty,
      product_description,
    } = data;

    await db.from('products').insert({
      product_name,
      product_stock_qty,
      product_price,
      product_description,
    });
  };

  const handleLogin = async () => {
    if (password !== import.meta.env.VITE_ENV_APP_AUTH_PASS) {
      alert('wrong pass!');
      setPassword('');
      return;
    }

    const { error } = await db.auth.signInWithPassword({
      email: 'dev@bmawebdev.ro',
      password,
    });

    if (error) {
      alert('Something went wrong. Please try again!');
      setPassword('');
      return;
    }

    setIsLoggedIn(true);
  };

  return (
    <div className="w-full m-auto flex h-screen justify-center items-center max-w-md flex-col gap-4">
      <Link to="/" className="text-blue-700 flex gap-2 w-full">
        <img src={LeftArrow} width={24} alt="back arrow" />
        Go back
      </Link>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
      >
        {!isLoggedIn ? (
          <div className="mb-6">
            <label
              className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                htmlFor="username"
              >
                Name
                <span className="text-red-500 text-xs italic">*</span>
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Product's name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                htmlFor="username"
              >
                Description
              </label>

              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                rows={4}
                placeholder="Product's description (optional)"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                htmlFor="username"
              >
                Price
                <span className="text-red-500 text-xs italic">*</span>
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Product's price"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label
                className="text-gray-700 text-sm font-bold mb-2 gap-1 flex"
                htmlFor="username"
              >
                Stock Qty
                <span className="text-red-500 text-xs italic">*</span>
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock_qty"
                type="number"
                placeholder="Product's stock qty"
                onChange={(e) => setStockQty(parseFloat(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label
                className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                htmlFor="username"
              >
                Thumbnail URL
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Product's thumbnail URL (optional)"
                onChange={(e) => setThumbnailURL(e.target.value)}
              />
            </div>
          </>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={() =>
            isLoggedIn
              ? addProduct({
                  product_name: name,
                  product_price: price,
                  product_stock_qty: stockQty,
                  product_description: description,
                })
              : handleLogin()
          }
        >
          {isLoggedIn ? 'Add product' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
