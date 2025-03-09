import { ArticleAuthor } from '@/app/utils/constants';

type Props = {
  authors: string[];
  handleAuthorChange: (source: string) => void;
};
export const Authors = ({ authors, handleAuthorChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {ArticleAuthor.map((author, ind) => (
        <div key={ind} className="flex items-center gap-1">
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            onChange={() => handleAuthorChange(author)}
            checked={authors ? authors.includes(author) : false}
          />
          <p className="text-sm">{author}</p>
        </div>
      ))}
    </div>
  );
};
