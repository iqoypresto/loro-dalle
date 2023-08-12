import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs"

export function HomeCard(Cards) {
    return (
        <>
            <div className="rounded overflow-hidden shadow-lg">
                <img
                    className="w-full"
                    src={Cards.src}
                    alt="Sunset in the mountains"
                ></img>
                <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2">{Cards.title}</div>
                    <p className="text-justify">{Cards.content}</p>
                </div>
                <div className="px-6 py-4">
                    <a href="#" className="text-teal-800 underline hover:text-teal-950">
                        Dapatkan {Cards.title}
                    </a>
                </div>
            </div>
        </>
    )
}

export function HomeTestimoniCard() {

    const data =
    {
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        name: "Nama Orang",
        jabatan: "Pekerjaan/jabatan",
    }

    function handleClick() {
    }
    return (
        <div className="testimoni-card text-center grid grid-cols-8">
            <div className="col-start-1 items-center flex justify-center">
                <FaAngleLeft size={70} className="cursor-pointer" onClick={handleClick} />
            </div>
            <div className="col-start-2 col-span-6">
                <h4 className="content">{data.content}</h4>
                <h4 className="nama">{data.name}</h4>
                <h5>{data.jabatan}</h5>
            </div>
            <div className="col-end-9 items-center flex justify-center">
                <FaAngleRight size={70} className="cursor-pointer" onClick={handleClick} />
            </div>
        </div>
    )
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
    )
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
    )
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
    )
}