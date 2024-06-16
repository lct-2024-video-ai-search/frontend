import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { VideosProvider } from "@/lib/providers";
import { ReactQueryDevtoolsProvider } from "@/lib/react-query-devtools";
import { Suspense } from "react";

const ibm = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zvezdolet Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <Suspense>
        <VideosProvider>
          <html lang="en">
            <body className={cn(ibm.className)}>
              <div className="px-[1rem] pt-[3rem] max-w-[67rem] mx-auto">
                {children}
                <ReactQueryDevtoolsProvider />
              </div>
            </body>
          </html>
        </VideosProvider>
      </Suspense>
    </ReactQueryProvider>
  );
}
