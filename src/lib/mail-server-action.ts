"use server";
import axios from "axios";
import { responseType } from "./types/custom";

export const getGmail = async (
  token: string,
  nextPageToken: string | undefined | null
): Promise<{
  data: responseType[];
  nextPageToken: string;
} | null> => {
  const backendUrl = process.env.BACKEND_URL;
  let GOOGLE_GET_ENDPOINT = `${backendUrl}/mail`;
  if (nextPageToken && nextPageToken !== "") {
    GOOGLE_GET_ENDPOINT += `?nextPageToken=${nextPageToken}`;
  }
  try {
    const response = await axios.get(GOOGLE_GET_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: {
      data: responseType[];
      nextPageToken: string;
    } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

export const fetchPost = async (emailid: string, token: string) => {
  "use server";
  const backendUrl = process.env.BACKEND_URL;
  try {
    const { data } = await axios.get(
      `${backendUrl}/mail/summary?emailId=${emailid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
