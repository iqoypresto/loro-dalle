import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";

export function HomeCard({ src, product }) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src={src} alt="Sunset in the mountains"></img>
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-2">{product.title}</div>
          <p className="text-justify">{product.description}</p>
        </div>
        <div className="px-6 py-4">
          <a
            href={"#"}
            className="text-teal-800 underline hover:text-teal-950"
          >
            Dapatkan {product.title}
          </a>
        </div>
      </div>
    </>
  );
}

export function HomeTestimoniCard({ testimony }) {
  function handleClick() {}
  return (
    <div className="testimoni-card text-center grid grid-cols-8">
      <div className="col-start-1 items-center flex justify-center">
        <FaAngleLeft
          size={35}
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="col-start-2 col-span-6">
        <h4 className="content">{testimony.content}</h4>
        <h4 className="nama">{testimony.fullname}</h4>
        <h5>{testimony.position}</h5>
      </div>
      <div className="col-end-9 items-center flex justify-center">
        <FaAngleRight
          size={35}
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export function UserDashboardCard(x) {
  return (
    <>
      <div className="user-card h-full text-center">
        <h3>{x.number}</h3>
        <p>{x.title}</p>
        <p className="explanation">{x.explanation}</p>
      </div>
    </>
  );
}
export function UserDashboardCardUp(x) {
  return (
    <>
      <div className="user-card h-full text-center relative -z-10">
        <div className="absolute top-2 right-2">
          <BsArrowDownRight color="white" size={24} />
        </div>
        <h3>{x.number}</h3>
        <p>{x.title}</p>
        <p className="explanation">{x.explanation}</p>
      </div>
    </>
  );
}
export function UserDashboardCardDown(x) {
  return (
    <>
      <div className="user-card h-full text-center relative -z-10">
        <div className="absolute top-2 right-2">
          <BsArrowUpRight color="white" size={24} />
        </div>
        <h3>{x.number}</h3>
        <p>{x.title}</p>
        <p className="explanation">{x.explanation}</p>
      </div>
    </>
  );
}
