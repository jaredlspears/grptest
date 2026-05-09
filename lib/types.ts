export type Section = {
  heading: string;
  body: string;
  questions: string[];
};

export type Discussion = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  sections: Section[];
};

export type DiscussionInput = Omit<Discussion, "id" | "createdAt">;
