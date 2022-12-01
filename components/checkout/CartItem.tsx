import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { getTotal, removeToCart } from "../../redux/feature/cartSlide";
import { urlFor } from "../../sanity";

type CartItemProps = {
  cartItem: CartItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeToCart(cartItem));
    dispatch(getTotal);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-start border-b border-gray-300 p-2 sm:flex-row  sm:justify-center lg:w-3/4">
      <div className="relative h-52 w-52">
        <Image
          src={urlFor(cartItem.image[0]).url()}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>

      <div className="flex w-full items-end  py-2 sm:flex-1 lg:items-center">
        <div className="flex w-full items-center justify-between ">
          <div className=" flex-col gap-x-8  lg:flex-row ">
            <h4 className=" text-lg font-semibold lg:w-96 lg:text-xl">
              {cartItem.title}
            </h4>
            <p className="flex cursor-pointer items-center text-blue-400 hover:underline">
              Show product details
              <ChevronDownIcon className="h-6 w-6 text-blue-500"></ChevronDownIcon>
            </p>
          </div>
          <span className="flex items-center gap-x-1 text-lg font-semibold lg:text-xl">
            <div className="flex flex-col items-center justify-center">
              <ChevronUpIcon className="h-6 w-6 cursor-pointer text-blue-500"></ChevronUpIcon>
              {cartItem.quantity}
              <ChevronDownIcon className="h-6 w-6 cursor-pointer text-blue-500"></ChevronDownIcon>
            </div>
          </span>
          <div className="">
            <h4 className="text-lg font-semibold lg:text-xl">
              $ {cartItem.price * cartItem.quantity}
            </h4>

            <button
              onClick={remove}
              className="font-medium text-blue-500 hover:underline "
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
