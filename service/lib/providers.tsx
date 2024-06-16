"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { VideoType } from "./types";
import { useSearchParams } from "next/navigation";

interface VideosProviderContextType {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  selectedVideo: VideoType | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<VideoType | null>>;
}

const VideosProviderContext = createContext<VideosProviderContextType | null>(
  null
);

export const useVideosProvider = () => {
  const context = useContext(VideosProviderContext);

  if (!context) {
    throw new Error("useVideosProvider must be used within a VideosProvider");
  }

  return context;
};

export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const [searchString, setSearchString] = useState<string>(
    searchParams.get("q") || ""
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    if (window === undefined) return;
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchString);
    window.history.pushState(null, "", url.toString());
  }, [searchString]);

  return (
    <VideosProviderContext.Provider
      value={{ searchString, setSearchString, selectedVideo, setSelectedVideo }}
    >
      {children}
    </VideosProviderContext.Provider>
  );
};
