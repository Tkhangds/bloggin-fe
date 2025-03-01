import BlogCard from "@/components/blog/blog-card";
import { LandingLayout } from "@/components/layouts/landing";

export default function BlogBrowse() {
  return (
    <LandingLayout>
      <div className="py-5">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </LandingLayout>
  );
}
