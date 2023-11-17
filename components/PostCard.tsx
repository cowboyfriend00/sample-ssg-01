import Link from 'next/link';
import { PostType } from '../interfaces/post';

const PostCard = ({ postInfo }: { postInfo: PostType }) => {
  const { slug, title, date } = postInfo;
  return (
    <Link href={`/${slug}`}>
      <div
        style={{
          width: '400px',
          border: '1px solid gray',
          borderRadius: '4px',
          padding: '12px',
          margin: '8px 0',
          cursor: 'pointer',
        }}
      >
        {title} - {date}
      </div>
    </Link>
  );
};

export default PostCard;
