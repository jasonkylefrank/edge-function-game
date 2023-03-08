import cn from "classnames";
import "./globals.css";
import { Poppins } from "@next/font/google";
import AppBar from "components/app-bar/app-bar";
import AnalyticsWrapper from "components/analytics";

// TODO: Consider finding a variable-weight font so I don't need to specify the weights
const poppins = Poppins({
  variable: "--font-poppins", // This creates a CSS variable. See it in-use in Tailwind.config
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  // I believe this tells the Next font engine to go ahead and swap from the default font
  //  to our desired custom one, even if it does not load within 100ms.
  //  See: (1) https://github.com/vercel/next.js/issues/43692#issuecomment-1336436755
  //       (2) https://nextjs.org/docs/basic-features/font-optimization#choosing-font-display
  display: "swap",
});

export const metadata = {
  title: {
    default: "Xata Worker game by Jason Frank",
    template: "%s • Xata game by Jason Frank", // Allows us to create a composite title based on title from nested pages
  },
  description:
    "An experiment to test-out the new Xata workers (edge functions)",
  // Next.js is now putting this viewport meta tag in automatically
  //viewport: "width=device-width, initial-scale=1",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(poppins.className, "h-full")}>
      <head />

      <body className="h-full">
        {/* Notes:
                (1) The children may also be wrapped by nested layout file(s). 
                (2) The children are also wrapped by my `template.tsx` (if present at some level).  See: https://beta.nextjs.org/docs/routing/pages-and-layouts#templates 
                    That file can be useful for applying page transitions, etc.
          */}
        {children}

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
