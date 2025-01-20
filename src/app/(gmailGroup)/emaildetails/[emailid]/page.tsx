"use client";
import ErrorCard from "@/components/Error";
import Loader from "@/components/Loader";
import { useEmailData } from "@/providers/email-data";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, RotateCcw, Trash2, Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const EmailDetail = ({
  params: { emailid },
}: {
  params: {
    emailid: string;
  };
}) => {
  const { posts } = useEmailData();
  const thatPost = posts.find((post) => post.id === emailid);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [post, setPost] = useState<string>("");
  const [regenerate, setRegenerate] = useState<boolean>(false);

  // useEffect(() => {
  //   const xmlReq = new XMLHttpRequest();

  //   xmlReq.open("POST", "http://localhost:8080/summary-generator", true);
  //   xmlReq.setRequestHeader("Content-Type", "application/json");

  //   xmlReq.onprogress = (event) => {
  //     setIsLoading(false);
  //     const requestType = event.currentTarget as XMLHttpRequest;
  //     console.log(requestType.responseText);
  //     setPost(requestType.responseText);
  //   };

  //   xmlReq.onerror = (event) => {
  //     console.log(event);
  //     setIsError(true);
  //   };

  //   xmlReq.send(JSON.stringify({ prompt: thatPost?.content }));
  // }, [thatPost, regenerate]);

  useEffect(() => {
    const fetchPost = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_EMAIL;
      try {
        const {
          data: { data },
        } = await axios.post(`${backendUrl}`, { prompt: thatPost?.content });
        setIsLoading(false);
        setPost((prev) => prev + data);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsError(true);
        setIsLoading(false);

      }
    };

    fetchPost();
  }, [thatPost]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0B1623] text-white">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ErrorCard message={"Failed to fetch data"} />;
  }

  if (!thatPost) {
    return (
      <div className="min-h-screen bg-[#0B1623] text-white">
        <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Error</h1>
          <div className="text-gray-300 leading-relaxed">
            <p>No email found</p>
          </div>
        </div>
      </div>
    );
  }

  const handleRetry = () => {
    setRegenerate(!regenerate);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
  };

  return (
    <div className="min-h-screen bg-[#0B1623] text-white">
      <div className="bg-[#0F1C2E] p-4 flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="flex gap-4">
          <button
            onClick={handleRetry}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            <Trash2 size={24} />
          </button>
          <button
            onClick={handleCopy}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Copy size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{thatPost?.title}</h1>
        <div className="text-gray-300 leading-relaxed">
          <p>{post}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
