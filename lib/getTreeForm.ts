export const getTreeForm = (
  posts: any,
  id = "__posts",
  parentId = "parentId",
  depth = 0
) => {
  return posts
    .filter((item: any) => {
      return item[parentId] === id;
    })
    .map((item: any) => ({
      ...item,
      depth: depth,
      childNodes: getTreeForm(
        posts.filter((item: any) => {
          return item[parentId] !== id;
        }),
        item.id,
        parentId,
        depth + 1
      ),
    }))
    .sort((post1: any, post2: any) => (post1.seq < post2.seq ? -1 : 1));
};
