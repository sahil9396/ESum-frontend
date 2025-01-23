"use server";

import { responseType } from "./types/custom";

export const getGmail = async (
  token: string,
  nextPageToken: string | null
): Promise<{
  data: responseType[];
  nextPageToken: string;
} | null> => {
  const backendUrl = process.env.BACKEND_URL;
  let GOOGLE_GET_ENDPOINT = `${backendUrl}/list-mail`;
  if (nextPageToken && nextPageToken !== "") {
    GOOGLE_GET_ENDPOINT += `/${nextPageToken}`;
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
};
