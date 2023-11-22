import type { Author } from "./author";

export type PostType = {
  slug: string;
  title?: string;
  seq?: number;
  folderSeq?: number;
  content: string;
};
