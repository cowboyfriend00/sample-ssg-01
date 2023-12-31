import fs from "fs";
import { join, resolve } from "path";
import matter from "gray-matter";
import { describeDirStructure, GenericObject } from "./test";
import { PostType } from "../interfaces/postType";
import markdownToHtml from "./markdownToHtml";

const postsDirectory = join(process.cwd(), process.env.ROOT_DIR as string);
// const postsDirectory = join(process.cwd());

export function getPostSlugs(): string[] {
  // console.log('postsDirectory',postsDirectory);
  // console.log('describeDirStructure',describeDirStructure(resolve(postsDirectory)));
  // console.log('readdirSync',fs.readdirSync(postsDirectory));

  // return fs.readdirSync(postsDirectory);

  // const files = getSlugByDirStructure(describeDirStructure(resolve(postsDirectory)));
  // console.log('===최종files===',files)
  return getSlugByDirStructure(describeDirStructure(resolve(postsDirectory)));
}
const getSlugByDirStructure = (dir: GenericObject) => {
  let files: string[] = [];
  // console.log('files',files)
  // console.log('dir',dir)
  const { files: dirFiles, ...childDir } = dir;
  files = [...files, ...(dirFiles as string[])];
  // console.log('files',files)
  for (const key in childDir) {
    // console.log('key',key);
    // console.log('childDir[key]',childDir[key]);
    // console.log('dirFiles',dirFiles);
    if (JSON.stringify(childDir[key]) !== "{}") {
      if ((childDir[key] as string[]).length > 0) {
        files = [
          ...files,
          ...(childDir[key] as string[]).map((fileName) => join(key, fileName)),
        ];
      } else {
        // console.log('files-before', files);
        files = [
          ...(files as string[]),
          ...getSlugByDirStructure(childDir[key] as GenericObject).map(
            (fileName) => join(key, fileName)
          ),
        ];
        // console.log('files-after', files);
      }
    }
  }
  // console.log('return files',files)
  return files;
};

export function getPostBySlug(slug: string, fields: string[] = []) {
  // console.log("getPostBySlug", slug);
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(postsDirectory, `${realSlug}.md`);
  // console.log('fullPath',fullPath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};
  // console.log("fields", fields);
  // console.log("data", data);

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  const strings = realSlug.split("/");
  // console.log("strings", strings);
  if (strings.length > 0) {
    if (strings.length === 1) {
      items["parentId"] = process.env.ROOT_DIR || "";
      items["id"] = realSlug;
    } else if (strings.length === 2) {
      if (strings[strings.length - 1] !== strings[strings.length - 2]) {
        items["parentId"] = strings[strings.length - 2];
      } else {
        items["parentId"] = process.env.ROOT_DIR || "";
      }
      items["id"] = strings[strings.length - 1];
    } else if (strings.length > 2) {
      if (strings[strings.length - 1] === strings[strings.length - 2]) {
        items["parentId"] = strings[strings.length - 3];
        items["id"] = strings[strings.length - 2];
      } else {
        items["parentId"] = strings[strings.length - 2];
        items["id"] = strings[strings.length - 1];
      }
    }
  }

  // console.log('items',items)
  return items;
}
export function getPostBySlugForProps(slug: string[], fields: string[] = []) {
  // console.log('slug',slug);
  // console.log('slug[slug.length]',slug[slug.length-1]);
  slug[slug.length - 1] = slug[slug.length - 1].replace(/\.md$/, "");
  // console.log('slug',slug);
  const fullPath = join(postsDirectory, ...slug);
  // console.log('fullPath',fullPath);
  const fileContents = fs.readFileSync(`${fullPath}.md`, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};
  // console.log('fields',fields)
  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = join(...slug);
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  // console.log('items',items)
  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const posts = getPostBySlug(slug, fields);
    return posts;
  });
  // sort posts by date in descending order
  // .sort(
  //   (post1, post2) =>
  //     (post1.folderSeq < post2.folderSeq ? -1 : 1) &&
  //     (post1.seq < post2.seq ? -1 : 1)
  // );
  return posts;
}
