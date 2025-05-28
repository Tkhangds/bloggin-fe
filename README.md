# Bloggin - Modern Blogging Platform

![Bloggin Logo](/public/image/Blogging.svg)

Bloggin is a modern, feature-rich blogging platform built with Next.js and TypeScript. It provides a seamless and intuitive writing experience with a powerful WYSIWYG editor, real-time collaboration, and a beautiful, responsive UI.

## ✨ Features

- **Rich Text Editor**: Powered by Tiptap with extensive formatting options
- **Real-time Collaboration**: Work together with other writers in real-time
- **Markdown Support**: Write in Markdown or use the rich text editor
- **Draft Management**: Save and manage drafts before publishing
- **User Authentication**: Secure sign-up and sign-in functionality
- **User Profiles**: Customizable user profiles with bio and avatar
- **Commenting System**: Engage with readers through comments
- **Categories & Tags**: Organize content with categories and tags
- **Favorites**: Save your favorite posts for later reading
- **Follow System**: Follow your favorite authors
- **Image Upload**: Seamless image uploads with Cloudinary integration
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark/Light Mode**: Choose your preferred theme

## 🛠️ Technologies

- **Frontend Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/)
  - [Shadcn/ui](https://ui.shadcn.com/)
- **Editor**: [Tiptap](https://tiptap.dev/) with numerous extensions
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Image Management**: [Cloudinary](https://cloudinary.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/) & [Sonner](https://sonner.emilkowal.ski/)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/bloggin-fe.git
cd bloggin-fe
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📁 Project Structure

```
src/
├── apis/         # API integration services
├── app/          # Next.js app directory with routes
├── components/   # Reusable UI components
├── context/      # React context providers
├── extensions/   # Tiptap editor extensions
├── hooks/        # Custom React hooks
├── lib/          # Utility libraries
├── styles/       # Global styles and Tailwind configuration
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## 🧩 Key Components

- **Editor**: A powerful WYSIWYG editor with AI assistance for content creation
- **Authentication**: Secure user authentication system
- **User Dashboard**: Manage posts, drafts, and profile settings
- **Blog Viewer**: Optimized reading experience for blog posts
- **Category Explorer**: Discover content by categories and tags

## 🔒 Authentication

The application uses a token-based authentication system with secure HTTP-only cookies.

## 📱 Responsive Design

Bloggin is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

## 🖼️ Screenshots

![Home Page](/public/image/sample/home.png)
![Editor](/public/image/sample/editor.png)
![Post View](/public/image/sample/post.png)
![For You](/public/image/sample/for-you.png)
![Your Posts](/public/image/sample/your-post.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js team](https://nextjs.org/) for the amazing framework
- [Tiptap](https://tiptap.dev/) for the powerful editor
- All open-source contributors whose libraries made this project possible
