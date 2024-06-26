import { BACKEND_URL } from "@/lib/consts";
import { useQuery } from "@tanstack/react-query";
import { VideoType } from "./types";
import { useVideosProvider } from "./providers";
import { useEffect, useMemo, useRef, useState } from "react";

export const useFetchVideos = (args?: { size?: number }) => {
  const [page, setPage] = useState<number>(1);
  const { size = 16 } = args || {};
  const [videos, setVideos] = useState<VideoType[]>([]);

  const { data, ...rest } = useQuery({
    queryKey: ["videos", page, size],
    queryFn: async () => {
      const response = await fetch(
        `${BACKEND_URL}/videos?size=${size}&page=${page}`
      );
      const data = (await response.json()) as Promise<VideoType[]>;
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setVideos((prev) => [...prev, ...data]);
    }
  }, [data]);

  return { videos, ...rest, loadMore: () => setPage((prev) => prev + 1) };
};

export const useFetchGoogleSuggestions = (query: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: async () => {
      const response = await fetch(`/api/suggest?q=${query}`);
      return response.json() as Promise<string[]>;
    },
  });

  return { suggestions: data || [], ...rest };
};

export const useFetchDzenSuggestions = (query: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: async () => {
      const response = await fetch(`/api/suggest-dzen?q=${query}`);
      return response.json() as Promise<string[]>;
    },
  });

  return { suggestions: data || [], ...rest };
};

export const useSearchVideos = (args?: { query: string; size?: number }) => {
  const [page, setPage] = useState<number>(0);
  const { query: propsQuery, size = 8 } = args || {};
  const query = useMemo(() => propsQuery || "", [propsQuery]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const queryRef = useRef(query);
  const dataRef = useRef<VideoType[]>([]);
  const { data, ...rest } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      setPage(0);
      const response = await fetch(`${BACKEND_URL}/search?text=${query}`);
      const data = response.json() as Promise<VideoType[]>;
      setVideos((await data).slice(0, size));
      return data;
    },
  });

  useEffect(() => {
    if (!data || page < 1) return;
    setVideos((prev) => [
      ...prev,
      ...data.slice(page * size, (page + 1) * size),
    ]);
  }, [page, data, size]);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  return { videos, ...rest, loadMore: () => setPage((prev) => prev + 1) };
};
