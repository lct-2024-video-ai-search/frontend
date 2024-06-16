import { SearchBar } from "@/components/entities/search-bar";
import { Videos } from "@/components/entities/videos";
import { Logo } from "@/shared/images/logo";

export default function Home() {
  return (
    <main className="w-full flex  flex-col items-center">
      <div className="mb-[2rem]">
        <Logo />
      </div>
      <div className="w-full mb-[2rem]">
        <SearchBar />
      </div>
      <Videos />
    </main>
  );
}
