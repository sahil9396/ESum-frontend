export type bodyType = {
  size: number;
  data: string;
  attachmentId: string;
};

export type messageBodyType = {
  headers: {
    name: string;
    value: string;
  }[];
  body: bodyType;
  parts: messageBodyType[];
};

export type responseType = {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: messageBodyType;
  internalDate: string;
  body: bodyType;
  nextPageToken: string;
};

export type postType = {
  id: string;
  title: string;
  content: string;
  from: string;
};
