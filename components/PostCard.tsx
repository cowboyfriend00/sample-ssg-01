import Link from "next/link";
import { PostType } from "../interfaces/postType";

const PostCard = ({ postInfo }: { postInfo: PostType }) => {
  const { slug, title } = postInfo;
  return (
    <Link href={`/${slug}`}>
      <div
        style={{
          width: "400px",
          border: "1px  solid gray",
          borderRadius: "4px",
          padding: "12px",
          margin: "8px 0",
          cursor: "pointer",
        }}
      >
        {title}
      </div>
    </Link>
  );
};

export default PostCard;
