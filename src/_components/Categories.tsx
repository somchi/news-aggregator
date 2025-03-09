import { ArticleCategories } from '@/app/utils/constants';
import { toUpper } from '@/app/utils/helper';

type Props = {
  categories: string[];
  handleCategoryChange: (source: string) => void;
};
export const Categories = ({ categories, handleCategoryChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {ArticleCategories.map((category, ind) => (
        <div key={ind} className="flex items-center gap-1">
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            onChange={() => handleCategoryChange(category)}
            checked={categories ? categories.includes(category) : false}
          />
          <p className="text-sm">{toUpper(category)}</p>
        </div>
      ))}
    </div>
  );
};
