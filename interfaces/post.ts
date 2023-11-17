import type { Author } from './author';

export type PostType = {
  slug: string;
  category: string[];
  title: string;
  date: string;
  coverImage?: string;
  author: Author;
  content: string;
};
