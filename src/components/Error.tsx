"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  message: string;
};

const ErrorCard: React.FC<Props> = ({ message }) => {
  const route = useRouter();
  const handleRetry = () => {
    route.refresh();
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3 ">
      <div className="text-white p-2 border border-red-500 rounded ">
        {message}
      </div>
      <button
        onClick={handleRetry}
        className="bg-primary hover:bg-primary/50 w-fit h-fit font-bold py-2 px-4 rounded"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorCard;
