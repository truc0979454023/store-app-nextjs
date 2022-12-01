import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urlFor } from "../../sanity";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getTotal } from "../../redux/feature/cartSlide";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const addCart = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(getTotal());
  };

  const [isChange, setIsChange] = useState(false);
  return (
    <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 rounded-md bg-[#35383c] p-6">
      <div
        onMouseOver={() => setIsChange(true)}
        onMouseOut={() => setIsChange(false)}
        className="m-x-auto relative h-72 w-full"
      >
        <Image
          src={urlFor(
            isChange && product.image[1] ? product.image[1] : product.image[0]
          ).url()}
          alt=""
          objectFit="contain"
          height={320}
          width={320}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex items-center justify-between text-lg font-semibold text-white md:text-xl">
        <div className="flex flex-col">
          <span>{product.title}</span>
          <span>${product.price}</span>
        </div>
        <div
          onClick={() => addCart(product)}
          className="h-10 w-10 cursor-pointer rounded-full bg-gradient-to-r from-pink-600 to-violet-500 p-2 transition-all hover:p-1"
        >
          <ShoppingCartIcon />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
