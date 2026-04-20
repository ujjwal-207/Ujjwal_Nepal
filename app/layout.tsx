import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./Store/Provider";

export const metadata: Metadata = {
  title: "Ujjwal Nepal - Full Stack Developer",
  description: "Full Stack Developer specializing in modern web technologies. Building exceptional digital experiences with React, Next.js, Node.js, and cloud technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Portfolio", "Ujjwal Nepal"],
  authors: [{ name: "Ujjwal Nepal", url: "https://ujjwal-nepal.com.np" }],
  creator: "Ujjwal Nepal",
  metadataBase: new URL("https://ujjwal-nepal.com.np"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ujjwal-nepal.com.np",
    title: "Ujjwal Nepal - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies. Building exceptional digital experiences.",
    siteName: "Ujjwal Nepal Portfolio",
    images: [
      {
        url: "/data/SiteSshot.png",
        width: 1200,
        height: 630,
        alt: "Ujjwal Nepal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Nepal - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies.",
    creator: "@Ujee690",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
