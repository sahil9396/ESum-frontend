"use client";
import ErrorCard from "@/components/Error";
import Loader from "@/components/Loader";
import { postType, responseType } from "@/lib/types/custom";
import { customDomParse, extraContent } from "@/utils/utils";
// import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// const demoPostData: postType[] = [
//   {
//     id: "1",
//     title: "The Impact of Technology on Education",
//     content:
//       "Technology has revolutionized the way we learn and teach. From online courses to interactive whiteboards, the integration of technology in education has made learning more accessible and engaging. It allows students to access a wealth of information at their fingertips and enables teachers to create dynamic and interactive lessons. However, it also presents challenges such as the digital divide and the need for proper training for educators.",
//     from: "John Doe",
//   },
//   {
//     id: "2",
//     title: "The Benefits of a Healthy Lifestyle",
//     content:
//       "Maintaining a healthy lifestyle is crucial for overall well-being. Regular exercise, a balanced diet, and adequate sleep are essential components of a healthy lifestyle. These habits can help prevent chronic diseases, improve mental health, and increase longevity. Additionally, staying active and eating nutritious foods can boost energy levels and enhance mood, leading to a better quality of life.",
//     from: "Jane Doe",
//   },
//   {
//     id: "3",
//     title: "The Importance of Environmental Conservation",
//     content:
//       "Environmental conservation is vital for the sustainability of our planet. Protecting natural resources, reducing pollution, and promoting biodiversity are key aspects of conservation efforts. Individuals can contribute by adopting eco-friendly practices such as recycling, reducing waste, and supporting renewable energy sources. Collective action is necessary to address environmental challenges and ensure a healthy planet for future generations.",
//     from: "John Doe",
//   },
//   {
//     id: "4",
//     title: "The Evolution of Artificial Intelligence",
//     content:
//       "Artificial Intelligence (AI) has come a long way since its inception. Today, AI is used in various fields such as healthcare, finance, and transportation. It has the potential to transform industries by automating tasks, analyzing large datasets, and making predictions. However, the rise of AI also raises ethical concerns, including job displacement and the need for regulations to ensure its responsible use.",
//     from: "Jane Doe",
//   },
//   {
//     id: "5",
//     title: "The Role of Social Media in Modern Society",
//     content:
//       "Social media has become an integral part of modern society, influencing how we communicate, share information, and form relationships. It offers a platform for self-expression, networking, and staying informed about current events. However, social media also has its drawbacks, such as the spread of misinformation, privacy concerns, and the potential for addiction. It is important to use social media mindfully and critically evaluate the information we encounter.",
//     from: "John Doe",
//   },
// ];

const getGmail = async (
  token: string,
  nextPageToken: string | null
): Promise<{
  data: responseType[];
  nextPageToken: string;
}> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_EMAIL;
    let GOOGLE_GET_ENDPOINT = `${backendUrl}`;
    if (nextPageToken && nextPageToken !== "") {
      GOOGLE_GET_ENDPOINT += `?nextPageToken=${nextPageToken}`;
    }
    const response = await fetch(GOOGLE_GET_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: {
      data: responseType[];
      nextPageToken: string;
    } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Gmail data", error);
    throw new Error("Error fetching Gmail data");
  }
};

const EmailData = createContext<{
  posts: postType[];
  postCount: number;
  setPostCount: Dispatch<SetStateAction<number>>;
  isBackendProcessing: boolean;
  setIsBackendProcessing: Dispatch<SetStateAction<boolean>>;
}>({
  posts: [],
  postCount: 0,
  setPostCount: () => null,
  isBackendProcessing: false,
  setIsBackendProcessing: () => null,
});

type Props = {
  children: React.ReactNode;
};

const EmailDataProvider = ({ children }: Props) => {
  const [postCount, setPostCount] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [postData, setPostData] = useState<postType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isBackendProcessing, setIsBackendProcessing] = useState(false);
  const session = useSession();

  const helper = async (postCount: number) => {
    if (!session?.data) return null;
    const mails = await getGmail(
      session?.data.user.accessToken,
      postCount !== 0 ? nextPageToken : null
    );
    const sortedMails = mails.data.sort((a, b) => Number(a.id) - Number(b.id));
    const parser = new DOMParser();
    setNextPageToken(mails.nextPageToken);
    return sortedMails.map((mail): postType => {
      const doc = customDomParse(mail.payload.body?.data, parser);
      return {
        id: mail.id,
        title:
          mail.payload.headers.find(
            (header) => header.name.toLowerCase() === "subject"
          )?.value || mail.snippet,
        from:
          mail.payload.headers.find(
            (header) => header.name.toLowerCase() === "from"
          )?.value || "No sender",
        content:
          doc.body.textContent + "\n\n" + extraContent(mail.payload, parser),
      };
    });
  };

  // const {
  //   data: postData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["gmaillist", postCount],
  //   enabled: !!session?.data,
  //   retry: (failureCount) => failureCount < 1,
  //   queryFn: () => helper(postCount),
  //   placeholderData: (previousData) => previousData,
  // });

  useEffect(() => {
    if (session?.data) {
      helper(postCount)
        .then((data) => {
          setPostData((prevData) => [...(prevData || []), ...(data || [])]);
          setIsLoading(false);
          setIsBackendProcessing(false);
        })
        .catch((error) => {
          console.error("Error fetching Gmail data", error);
          setIsError(true);
          setIsLoading(false);
          setIsBackendProcessing(false);
        });
    }
  }, [session?.data, postCount]);

  if (session.status === "loading" || isLoading) {
    return (
      <div className=" w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ErrorCard message={"Something went wrong"} />
        {/* <ErrorCard message={error.message} /> */}
      </div>
    );
  }

  const value = {
    // posts: demoPostData,
    posts: postData || [],
    postCount,
    setPostCount,
    isBackendProcessing,
    setIsBackendProcessing,
  };

  return <EmailData.Provider value={value}>{children}</EmailData.Provider>;
};

export default EmailDataProvider;

export const useEmailData = () => {
  const context = useContext(EmailData);
  if (!context) {
    throw new Error("useEmailData must be used within EmailDataProvider");
  }
  return context;
};

// function throttle(func: any, delay: number) {
//   let lastCall = 0;
//   return function (...args) {
//     const now = new Date().getTime();
//     if (now - lastCall >= delay) {
//       func(...args);
//       lastCall = now;
//     }
//   };
// }

// function returnString() {
//   return "Hi";
// }

// const throttledScrollHandler = throttle(returnString, 1000);
