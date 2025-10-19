import { SearchAction } from "@/apis/search.action";
import { useQuery } from "@tanstack/react-query";

export const useSearch = () => {
  const useGetSearchResults = (query: string) => {
    return useQuery({
      queryKey: ["search", query],
      queryFn: () => {
        return SearchAction.searchAsync(query);
      },
    });
  };

  return { useGetSearchResults };
};
