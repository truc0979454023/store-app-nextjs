import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/header/Header";
import Landing from "../components/body/Landing";
import Products from "../components/body/Products";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getCart, getTotal } from "../redux/feature/cartSlide";
import { RootState } from "../redux/store";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type HomeProps = {
  categories: Category[];
  products: Product[];
  session: Session | null;
};

const Home = ({ categories, products }: HomeProps) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      dispatch(getCart(JSON.parse(data)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cart.notify.message) toast.success(cart.notify.message);
  }, [cart.notify]);

  return (
    <div className="">
      <Head>
        <title>Apple Customize Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative h-[200vh] bg-[#E7ecee]">
        <Landing />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B] py-16">
        <Products categories={categories} products={products} />
        <div className="sticky bottom-16 mx-0 flex justify-end pr-2 md:pr-8">
          <Link href="/checkout">
            <div className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-300">
              {cart.items?.length > 0 && (
                <span className="absolute -right-1 -top-1 z-50 box-content flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-0.5 text-[12px] font-medium  text-white">
                  {cart.items.length}
                </span>
              )}
              <ShoppingBagIcon className="headerIcon" />
            </div>
          </Link>
        </div>
      </section>
      <ToastContainer
        theme="light"
        autoClose={1500}
        closeButton={false}
        newestOnTop={false}
        pauseOnHover={false}
        position="bottom-center"
      />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const categories: Category[] = await fetchCategories();
  const products: Product[] = await fetchProducts();
  const session = await getSession(context);
  return {
    props: { categories, products, session },
  };
};
