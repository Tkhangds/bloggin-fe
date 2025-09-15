import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="relative hidden min-w-80 text-xs text-muted-foreground md:block">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={15}
      />
      <Input
        placeholder="Search..."
        className="rounded-full bg-muted py-4 pl-8 shadow-none focus:bg-transparent"
      />

      {/* <SearchResults /> */}
    </div>
  );
};

const SearchResults = () => {
  return (
    <div className="absolute -bottom-10 w-full bg-red-200">Search Result</div>
  );
};
