import AppBar from "components/app-bar/app-bar";

export default function RegularPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid h-full grid-rows-[auto_1fr_auto] justify-items-center
                     selection:bg-[#08eeb2] selection:text-black"
    >
      <AppBar />

      <main
        className="prose m-6 mt-20 mb-28 grid max-w-[1280px]
          place-items-center text-gray-900
          prose-a:text-blue-600 prose-a:no-underline md:m-7 md:mt-24 md:mb-32 md:prose-lg lg:m-8 lg:mt-28
          lg:mb-36"
      >
        {/* Note: The children are also wrapped by my `template.tsx` (if present at some level).  See: https://beta.nextjs.org/docs/routing/pages-and-layouts#templates 
                    That file can be useful for applying page transitions, etc.
          */}
        {children}
      </main>

      <footer className="grid w-screen place-items-center border-t border-black/10 bg-gray-100 px-4 py-4 text-xs opacity-70 sm:text-sm">
        <p className="text-center">
          Custom-built with
          <svg
            className="mx-1 inline-block h-4 opacity-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          with Next.js, Tailwind.css, Framer Motion and Vercel
        </p>
      </footer>
    </div>
  );
}
