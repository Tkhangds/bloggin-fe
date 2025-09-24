import { SearchAction } from "@/apis/search.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useSearch = () => {
  const queryClient = useQueryClient();

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
