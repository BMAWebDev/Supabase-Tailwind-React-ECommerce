import db from "@lib/db";
import { useState } from "react";

interface AddProductData {
  product_name: string;
  product_stock_qty: number;
  product_price: number;
  product_description?: string;
}

const AddProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("loggedIn") || "false")
  );

  const [name, setName] = useState("");
  const [stockQty, setStockQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const addProduct = async (data: AddProductData) => {
    const { product_name, product_price, product_stock_qty, product_description } = data;

    await db
      .from("products")
      .insert({ product_name, product_stock_qty, product_price, product_description });
  };

  const handleLogin = () => {
    if (password !== import.meta.env.VITE_ENV_APP_AUTH_PASS) {
      alert("wrong pass!");
      return;
    }

    setIsLoggedIn(true);
    sessionStorage.setItem("loggedIn", "true");
  };

  return (
    <div className="w-full m-auto flex h-screen justify-center items-center max-w-lg">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-1">
        {!isLoggedIn ? (
          <div className="mb-6">
            <label className="flex text-gray-700 text-sm font-bold mb-2 gap-1" htmlFor="password">
              Password
            </label>

            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="flex text-gray-700 text-sm font-bold mb-2 gap-1" htmlFor="username">
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
              <label className="flex text-gray-700 text-sm font-bold mb-2 gap-1" htmlFor="username">
                Description?
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
              <label className="flex text-gray-700 text-sm font-bold mb-2 gap-1" htmlFor="username">
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
              <label className="text-gray-700 text-sm font-bold mb-2 gap-1 flex" htmlFor="username">
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
          }>
          {isLoggedIn ? "Add product" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
