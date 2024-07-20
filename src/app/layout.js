import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { Metadata } from "next";

//  Static metadata
// either Static metadata
// Static metadata

// Static metadata
export const metadata = {
  title: "Mohammad El Prince",
  description: "My personal portfolio website",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    ],
    apple: { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
