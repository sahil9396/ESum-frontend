import { fetchPost } from "@/lib/mail-server-action";
import { ArrowLeft, RotateCcw, Trash2, Copy } from "lucide-react";
import Link from "next/link";


const EmailDetail = async ({
  params: { emailid },
}: {
  params: {
    emailid: string;
  };
}) => {
  if (!emailid) {
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

  const post = await fetchPost(emailid);

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(post);
  // };

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
          <button className="text-white hover:text-gray-300 transition-colors">
            <RotateCcw size={24} />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            <Trash2 size={24} />
          </button>
          <button
            // onClick={handleCopy}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Copy size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{post?.title}</h1>
        <div className="text-gray-300 leading-relaxed">
          <p>{post}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
