"use client";

import { useSearchVideos } from "@/lib/hooks";
import { useVideosProvider } from "@/lib/providers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { VideoType } from "@/lib/types";

const PlayIcon = () => {
  return (
    <svg
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path>
    </svg>
  );
};

const Video = (props: { video: VideoType }) => {
  const { setSelectedVideo } = useVideosProvider();
  return (
    <button
      onClick={() => setSelectedVideo(props.video)}
      style={{
        aspectRatio: 468 / 832,
        width: "100%",
      }}
      className="overflow-hidden rounded-[0.75rem] relative hover:scale-105 transform 
    transition duration-300"
    >
      <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid place-items-center">
        <div className="bg-black/50 grid place-items-center w-10 h-10 rounded-full">
          <PlayIcon />
        </div>
      </div>
      <video>
        <source src={props.video.link} type="video/mp4" />
      </video>
    </button>
  );
};

const VideoModal = () => {
  const { selectedVideo, setSelectedVideo } = useVideosProvider();
  const ref = useRef<HTMLVideoElement | null>(null);

  return (
    <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
      <DialogContent
        style={{
          aspectRatio: 468 / 832,
          display: "grid",
        }}
        className="p-0"
      >
        <video ref={ref} width="100%" height="100%" autoPlay playsInline>
          <source src={selectedVideo?.link} type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
  );
};

const Videos = () => {
  const { searchString } = useVideosProvider();
  const { videos, loadMore } = useSearchVideos({
    query: searchString,
    size: 12,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <>
      <VideoModal />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "1rem",
        }}
        className="w-full"
      >
        {videos.map((video, index) => (
          <div
            ref={index === videos.length - 1 ? lastItemRef : null}
            key={JSON.stringify(video) + index}
          >
            <Video video={video} />
          </div>
        ))}
      </div>
    </>
  );
};

export { Videos };
