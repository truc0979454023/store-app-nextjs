import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";

export type ProductsProps = {
  categories: Category[];
  products: Product[];
};

const Products = ({ categories, products }: ProductsProps) => {
  const [selected, setSelected] = useState<number>(-1);

  return (
    <div className="relative space-y-10 ">
      <h1 className="text-center text-4xl font-semibold tracking-wide text-white md:text-5xl">
        New promos
      </h1>

      <Tab.Group>
        <div className="flex justify-center px-4 md:px-0">
          <Tab.List className=" flex w-full justify-center  bg-transparent md:w-3/4">
            <Tab
              onClick={() => setSelected(-1)}
              className={` relative w-full rounded-t-md px-2 py-4 font-semibold focus:outline-none  ${
                selected === -1
                  ? " bg-gray-300  text-[#232428] before:absolute before:bottom-0 before:right-0 before:h-[2px] before:w-full before:bg-gradient-to-r  before:from-[#ec4899] before:to-[#8b5cf6]  before:bg-left-bottom before:bg-no-repeat "
                  : " text-[white] before:absolute before:bottom-0 before:right-0 before:h-[2px] before:w-full before:bg-white hover:bg-white/[0.12] hover:text-white"
              }`}
            >
              All Product
            </Tab>
            {categories.map((category, index) => (
              <Tab
                onClick={() => setSelected(index)}
                key={category._id}
                className={` relative w-full rounded-t-md px-2 py-4 font-semibold focus:outline-none  ${
                  selected === index
                    ? " bg-gray-300  text-[#232428] before:absolute before:bottom-0 before:right-0 before:h-[2px] before:w-full before:bg-gradient-to-r  before:from-[#ec4899] before:to-[#8b5cf6]  before:bg-left-bottom before:bg-no-repeat "
                    : " text-[white] before:absolute before:bottom-0 before:right-0 before:h-[2px] before:w-full before:bg-white hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="mt-2 flex justify-center">
          <Tab.Panel className="grid grid-cols-1  gap-x-3 gap-y-5 md:w-3/4 md:grid-cols-2  lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Tab.Panel>
          {categories.map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="grid grid-cols-1 gap-x-3 gap-y-5 md:w-3/4 md:grid-cols-2 md:justify-between lg:grid-cols-3"
            >
              {products.map(
                (product) =>
                  category._id === product.category._ref && (
                    <ProductCard key={product._id} product={product} />
                  )
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Products;
