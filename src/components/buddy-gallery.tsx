"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { SELECT_BUDDY_EVENT } from "@/components/buddy-stage";
import { buddies, portraitUrl } from "@/lib/buddies";

// Clicar num buddy leva ele pro palco lá em cima, comemorando.
export function BuddyGallery() {
  const choose = (slug: string) => {
    window.dispatchEvent(new CustomEvent(SELECT_BUDDY_EVENT, { detail: slug }));
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {buddies.map((buddy, index) => (
        <button
          key={buddy.slug}
          type="button"
          onClick={() => choose(buddy.slug)}
          className="group relative flex flex-col items-center overflow-hidden rounded-3xl border bg-card p-4 text-center transition hover:-translate-y-1 hover:shadow-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label={`Ver ${buddy.name} no palco`}
        >
          <span
            aria-hidden
            className="absolute inset-x-6 top-6 h-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
            style={{ background: buddy.color }}
          />
          <span
            className={
              buddy.premium
                ? "absolute right-3 top-3 rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-semibold tracking-wider text-gold"
                : "absolute right-3 top-3 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-primary"
            }
          >
            {buddy.premium ? "PREMIUM" : "GRÁTIS"}
          </span>
          <Image
            src={portraitUrl(buddy.slug)}
            alt={buddy.name}
            width={260}
            height={260}
            unoptimized
            className="relative size-32 animate-float transition-transform duration-300 group-hover:scale-110 sm:size-36"
            style={{ animationDelay: `${index * 0.45}s` }}
          />
          <p
            className="relative mt-1 flex items-center gap-1.5 font-display text-lg font-bold text-foreground dark:text-(--buddy)"
            style={{ "--buddy": buddy.color } as CSSProperties}
          >
            <span aria-hidden className="size-2 rounded-full" style={{ background: buddy.color }} />
            {buddy.name}
          </p>
          <p className="relative mt-1 text-xs text-muted-foreground">{buddy.tagline}</p>
        </button>
      ))}
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed p-4 text-center text-muted-foreground">
        <span className="grid size-12 place-items-center rounded-full border border-dashed">
          <Plus className="size-5" />
        </span>
        <p className="mt-3 font-display text-lg font-bold text-foreground">Vem mais aí</p>
        <p className="mt-1 text-xs">Novos buddies já estão sendo desenhados.</p>
      </div>
    </div>
  );
}
