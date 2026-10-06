import Image from "next/image";
import Link from "next/link";
import { Radio } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { portraitUrl } from "@/lib/buddies";
import { site } from "@/lib/site";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#jogos", label: "Jogos" },
  { href: "#streamer", label: "Pra streamers" },
  { href: "#buddies", label: "Buddies" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-1.5" aria-label={`${site.name}, início`}>
          <Image
            src={portraitUrl("astro")}
            alt=""
            width={40}
            height={40}
            unoptimized
            className="-my-2 size-10 transition-transform group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="font-display text-xl font-extrabold tracking-tight">
            game buddy<span className="text-primary">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Seções">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild className="h-9 rounded-lg px-3">
            <a href="#streamer" aria-label="Ver o modo streamer">
              <Radio />
              <span className="hidden sm:inline">Modo streamer</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
