import { ChevronDownIcon } from "@heroicons/react/outline";
import { iteratorSymbol } from "immer/dist/internal";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/checkout/CartItem";
import Button from "../components/common/Button";
import Header from "../components/header/Header";
import { getCart, getTotal } from "../redux/feature/cartSlide";
import { RootState } from "../redux/store";

const Checkout = () => {
  const router = useRouter();
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      dispatch(getCart(JSON.parse(data)));
      dispatch(getTotal());
    }
  }, [dispatch]);

  return (
    <div>
      <Head>
        <title>Apple Customize Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-[72px] min-h-[calc(100vh-72px)] bg-[#e7ecee] py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {cart.items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and free returns.</p>

          {cart.items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>
        {cart.items.length > 0 && (
          <>
            <div className="flex flex-col gap-y-6">
              {cart.items.map((item) => (
                <CartItem key={item._id} cartItem={item} />
              ))}
            </div>

            <div className="mx-auto w-full  lg:w-3/4">
              <div className="flex flex-col items-center justify-between gap-y-2 border-b border-gray-300 p-2">
                <div className=" flex w-full justify-between ">
                  <h3>Subtotal</h3>
                  <span className="">${cart.total}</span>
                </div>

                <div className="flex  w-full justify-between ">
                  <h3>Shipping</h3>
                  <span>Free</span>
                </div>

                <div className="flex  w-full  justify-between ">
                  <h3>Estimated tax for:</h3>
                  <span>$ -</span>
                </div>
                <div className="w-full">
                  <h3 className="flex cursor-pointer items-center text-blue-500">
                    Enter zip code
                    <ChevronDownIcon className="h-5 w-5" />
                  </h3>
                </div>
              </div>

              <div className="flex w-full justify-between p-2 text-lg font-semibold lg:text-xl ">
                <h3>Total</h3>
                <span>${cart.total}</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;
