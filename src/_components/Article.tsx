import { formatDate } from '@/app/utils/helper';
import { Article as NewsArticle } from '@/app/utils/types';
import Image from 'next/image';

export const Article = ({ article }: { article: NewsArticle }) => {
  // console.log(article);
  return (
    <div className="flex flex-col w-full md:w-[48%] max-w-sm h-full shadow rounded">
      <div className="w-full relative h-[200px]">
        <Image src={'/default.jpg'} alt="img" fill />
      </div>
      <div className="flex flex-col gap-2 px-3 py-2 h-[200px]">
        <h3
          className="font-semibold text-sm line-clamp-2"
          title={article.title}
        >
          {article.title}
        </h3>
        <p className="text-xs line-clamp-3">{article.description}</p>
        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col">
            <strong className="text-xs">Category</strong>
            <p className="text-xs">{article.category}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-xs">Published</strong>
            <p className="text-xs">{formatDate(article.date)}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <strong className="text-xs">Sources</strong>
          <p className="text-xs">{article.source}</p>
        </div>
        <div className="flex flex-col">
          <strong className="text-xs">Author</strong>
          <p className="text-xs">
            {article.author && article.author.includes('by')
              ? article.author
              : `by ${article.author}`}
          </p>
        </div>
      </div>
    </div>
  );
};
