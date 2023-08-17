import { siteConfig } from "@/config/site";

export default function Header() {
  return (
    <header className="bg-blue-500 py-3">
      <div className="container px-4 flex items-center justify-center gap-0.5">
        <span className="font-semibold text-xl text-white">{siteConfig.name}</span>
      </div>
    </header>
  );
}
