interface Author {
    name: string
    avatar: string
  }
  
  interface BlogPost {
    id:string
    title: string
    excerpt: string
    author: Author
    date: string
    readTime: number
    image?: string
    tags: string[]
    likes: number
    comments: number
  }