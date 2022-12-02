import { ChevronDownIcon } from "@heroicons/react/outline";
import { iteratorSymbol } from "immer/dist/internal";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stripe } from "stripe";
import CartItem from "../components/checkout/CartItem";
import Button from "../components/common/Button";
import Header from "../components/header/Header";
import { getCart, getTotal } from "../redux/feature/cartSlide";
import { RootState } from "../redux/store";
import { fetchPostJSON } from "../utils/api-helper";
import getStripe from "../utils/getStripes";

const Checkout = () => {
  const router = useRouter();
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      dispatch(getCart(JSON.parse(data)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_session",
      {
        items: cart.items,
      }
    );

    if ((checkoutSession as any).statusCade === 500) {
      console.error((checkoutSession as any).message);
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Apple Customize Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-[72px] min-h-[calc(100vh-72px)] bg-[#e7ecee] pb-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {cart.items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and free returns.</p>

          <Button title="Continue Shopping" onClick={() => router.push("/")} />
        </div>
        {cart.items.length > 0 && (
          <>
            <div className="flex flex-col gap-y-6">
              {cart.items.map((item) => (
                <CartItem key={item._id} cartItem={item} />
              ))}
            </div>

            <div className="mx-auto w-full  lg:w-3/4">
              <div className="flex flex-col items-center justify-between gap-y-2 border-b border-gray-300 p-4">
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
                  <h3 className="flex cursor-pointer items-center text-blue-500 hover:underline">
                    Enter zip code
                    <ChevronDownIcon className="h-5 w-5" />
                  </h3>
                </div>
              </div>

              <div className="flex w-full justify-between p-4 text-lg font-semibold lg:text-xl ">
                <h3>Total</h3>
                <span>${cart.total}</span>
              </div>

              <div className="my-14 space-y-4 p-4">
                <h4 className="text-xl font-semibold">
                  How wourl you like to check out?
                </h4>

                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR <sup className="-top-1"></sup>
                      </span>
                    </h4>
                    <Button
                      width="w-full"
                      title="Check Out with Apple card monthly Installments."
                    />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col items-center text-xl font-semibold">
                      Pay in full <span> ${cart.total}</span>
                    </h4>
                    <Button
                      onClick={createCheckoutSession}
                      width="w-full"
                      loading={loading}
                      isIcon={true}
                      title="Check out"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;
