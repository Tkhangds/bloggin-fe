'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button"
import {  Bookmark, MessageCircle, Heart} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";

export default function BlogCard({index, post } : {index: number, post: BlogPost}) {
  const router = useRouter(); 
  
  return (
    <article key={index} className="border-b pb-8 last:border-0 cursor-pointer">
                <div onClick={() => router.push("/wip")}>
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.author.name}</span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    
                      <h2 className="text-xl font-bold mb-2 hover:text-gray-700 transition-colors">{post.title}</h2>
                    
                    <p className="text-gray-700 line-clamp-3 mb-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="font-normal bg-gray-100 hover:bg-gray-200 text-gray-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                        <span className="text-xs text-gray-500">{post.readTime} min read</span>
                      </div>

                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {post.image && (
                    <div className="md:w-1/3 h-48 md:h-32 relative rounded-md overflow-hidden">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                  )}
                </div>
                </div>
              </article>
  );
}
