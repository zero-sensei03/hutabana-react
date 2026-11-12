import type { CategoryModuleRes } from "@/interfaces/public.interface";
import { useGetModulePublic } from "@/services/landing-page";
import { createElement, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router";
import { getCategoryIcon } from "@/constants/CategoryIcons";
import { getCategoryColor } from "@/constants/CategoryColors";
import { ArrowRight } from "lucide-react";
import ComponentLoading from "../loading/ComponentLoading";
import FetchError from "../errors/FetchError";

export const CategoryModuleCard = ({
  category,
}: {
  category: CategoryModuleRes;
}) => {
  const navigate = useNavigate();
  const handleClick = (slug: string) => {
    navigate(`/modules?category=${slug}`);
  };

  const icon = getCategoryIcon(category.icon);
  const color = getCategoryColor(category.code);

  return (
    <Card
      className={`md:px-4 px-2 py-4 rounded-md! cursor-pointer border border-muted hover:-translate-y-1 duration-200 hover:shadow-md hover:border-primary group ${color.hoverBackground} h-full`}
      onClick={() => handleClick(category.slug)}
    >
      <CardContent className="flex flex-col items-center justify-between h-full text-center space-y-1">
        <div
          className={`${color.background} border ${color.border} h-12 w-12 flex items-center justify-center rounded-md group-hover:rounded-full shadow-md mb-2`}
        >
          {createElement(icon, {
            size: 24,
            strokeWidth: 1.8,
            className: `${color.foreground} group-hover:rotate-360 duration-200`,
          })}
        </div>
        <h1 className="line-clamp-2 font-bold md:text-sm text-xs">
          {category.name}
        </h1>
        <p className="line-clamp-2 md:text-xs text-[10px]">
          {category.description}
        </p>
        <div
          onClick={() => handleClick(category.slug)}
          className={`${color.buttonBackground} relative mt-2 flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm border border-transparent px-2.5 py-1.5 transition-colors duration-300 ${color.border}`}
        >
          <span
            className={`absolute inset-0 -translate-x-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0`}
          />
          <span
            className={`relative z-10 flex items-center gap-2 transition-colors duration-300 text-white ${color.buttonHoverText} md:text-sm text-xs`}
          >
            See more
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const HomeModuleComponent = ({ limit }: { limit: number }) => {
  const { data, isLoading, error } = useGetModulePublic();

  const CATEGORY_MODULE_FETCH = useMemo(() => {
    return data?.data.slice(0, limit) || [];
  }, [data, limit]);
  return isLoading ? (
    <ComponentLoading />
  ) : error ? (
    <FetchError />
  ) : (
    <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 justify-between">
      {CATEGORY_MODULE_FETCH.map((items) => (
        <CategoryModuleCard key={items.code} category={items} />
      ))}
    </div>
  );
};
