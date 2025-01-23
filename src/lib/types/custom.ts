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
  title: string;
  content: string;
  from: string;
};

export type postType = {
  id: string;
  title: string;
  content: string;
  from: string;
};
