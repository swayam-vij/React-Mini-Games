import type { MouseEventHandler } from "react";

interface CardProps {
  select?: MouseEventHandler<HTMLDivElement>;
  status: string;
  img: string;
}

const Card = ({ select, status, img }: CardProps) => {
  return (
    <div
      className={`w-32 h-36 flex justify-center items-center cursor-pointer ${
        status === "facedown" ? "bg-gray-300" : "bg-white"
      } border ${status === "matched" ? "border-green-500" : "border-gray-500"} transition-transform transform ${
        status === "matched" ? "animate-pulse" : "animate-flipInY"
      }`}
      onClick={select}
    >
      {status !== "facedown" ? <img src={img} alt="memory tile" className="w-full h-full object-cover" /> : ""}
    </div>
  );
};

export default Card;
