"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { CloudRain, Crown, Frown, Goal, Zap, type LucideIcon } from "lucide-react";
import { BuddySprite } from "@/components/buddy-sprite";
import { buddies, findBuddy, moodDuration, portraitUrl, sheetUrl, type Mood, type Reaction } from "@/lib/buddies";
import { cn } from "@/lib/utils";

// A galeria e outros pontos da página pedem um buddy com este evento.
export const SELECT_BUDDY_EVENT = "gamebuddy:select";

const reactions: { mood: Reaction; label: string; icon: LucideIcon }[] = [
  { mood: "goal", label: "Gol!", icon: Goal },
  { mood: "conceded", label: "Sofri gol", icon: Frown },
  { mood: "victory", label: "Vitória", icon: Crown },
  { mood: "defeat", label: "Derrota", icon: CloudRain },
  { mood: "scared", label: "Susto", icon: Zap },
];

const moodNames: Record<Mood, string> = {
  idle: "de boa",
  goal: "comemorando um gol",
  conceded: "sofrendo um gol",
  victory: "comemorando a vitória",
  defeat: "chateado com a derrota",
  scared: "levando um susto",
};

const allMoods: Mood[] = ["idle", "goal", "conceded", "victory", "defeat", "scared"];
const demoOrder: Reaction[] = ["goal", "victory", "scared", "conceded", "goal", "defeat"];
const stars = [
  { left: "12%", top: "18%", delay: "0s" },
  { left: "26%", top: "34%", delay: "1.2s" },
  { left: "78%", top: "22%", delay: "0.6s" },
  { left: "88%", top: "44%", delay: "2s" },
  { left: "64%", top: "12%", delay: "1.6s" },
  { left: "40%", top: "16%", delay: "2.4s" },
];

export function BuddyStage() {
  const [slug, setSlug] = useState("drako");
  const [mood, setMood] = useState<Mood>("idle");
  const [startedAt, setStartedAt] = useState(0);
  const [line, setLine] = useState("");
  const [bubble, setBubble] = useState(false);
  const [entrance, setEntrance] = useState(0);
  const moodNow = useRef<Mood>("idle");
  const variants = useRef<Record<string, number>>({});
  const timers = useRef<number[]>([]);
  const touched = useRef(false);
  const sheets = useRef(new Map<string, Promise<void>>());
  const buddy = findBuddy(slug);

  const load = useCallback((who: string, which: Mood) => {
    const url = sheetUrl(who, which);
    let pending = sheets.current.get(url);
    if (!pending) {
      pending = new Promise<void>((resolve) => {
        const image = new window.Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = url;
      });
      sheets.current.set(url, pending);
    }
    return pending;
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const play = useCallback(
    (reaction: Reaction, who: string) =>
      load(who, reaction).then(() => {
        clearTimers();
        const key = who + reaction;
        const variant = variants.current[key] ?? 0;
        variants.current[key] = variant + 1;
        moodNow.current = reaction;
        setLine(findBuddy(who).lines[reaction][variant % 3]);
        setBubble(false);
        setMood(reaction);
        setStartedAt(performance.now());
        // Mesma janela da fala no app: aparece logo depois do gesto e sai antes do fim.
        const duration = moodDuration[reaction] * 1000;
        timers.current.push(window.setTimeout(() => setBubble(true), 320));
        timers.current.push(window.setTimeout(() => setBubble(false), duration - 720));
      }),
    [load, clearTimers],
  );

  const backToIdle = useCallback(() => {
    moodNow.current = "idle";
    setMood("idle");
    setStartedAt(performance.now());
    setBubble(false);
  }, []);

  const select = useCallback(
    (who: string, greet: boolean) => {
      clearTimers();
      moodNow.current = "idle";
      setSlug(who);
      setMood("idle");
      setStartedAt(performance.now());
      setBubble(false);
      setEntrance((value) => value + 1);
      allMoods.forEach((which) => load(who, which));
      if (greet) void play("victory", who);
    },
    [load, play, clearTimers],
  );

  useEffect(() => {
    allMoods.forEach((which) => load(slug, which));
  }, [slug, load]);

  useEffect(() => {
    const onSelect = (event: Event) => {
      touched.current = true;
      select((event as CustomEvent<string>).detail, true);
    };
    window.addEventListener(SELECT_BUDDY_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_BUDDY_EVENT, onSelect);
  }, [select]);

  // Enquanto ninguém mexe, o buddy se apresenta sozinho.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    let id = 0;
    const next = (delay: number) => {
      id = window.setTimeout(() => {
        if (touched.current) return;
        if (!document.hidden && moodNow.current === "idle") void play(demoOrder[step++ % demoOrder.length], slug);
        next(7000);
      }, delay);
    };
    next(2600);
    return () => window.clearTimeout(id);
  }, [play, slug]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <div className="relative rounded-[2rem] border bg-card/70 p-3 shadow-2xl shadow-primary/15 backdrop-blur sm:p-5">
      <div
        className="relative isolate h-[340px] overflow-hidden rounded-[1.5rem] border bg-stage sm:h-[400px]"
        style={{ "--buddy": buddy.color } as CSSProperties}
      >
        <div aria-hidden className="arena-floor absolute inset-x-[-25%] bottom-[-35%] h-[75%]" />
        <div
          aria-hidden
          className="absolute left-1/2 top-[58%] size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl transition-colors duration-500"
          style={{ background: buddy.color }}
        />
        {stars.map((star) => (
          <span
            key={star.left + star.top}
            aria-hidden
            className="absolute size-1 animate-twinkle rounded-full bg-foreground/60"
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
          />
        ))}
        <span className="absolute left-3 top-3 rounded-md bg-background/70 px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
          PRÉVIA DO SEU BUDDY
        </span>
        {buddy.premium && (
          <span className="absolute right-3 top-3 rounded-md bg-gold-soft px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-gold">
            PREMIUM
          </span>
        )}

        <div
          aria-live="polite"
          className={cn(
            "absolute inset-x-0 top-11 z-10 flex justify-center transition-all duration-300",
            bubble ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          <p className="relative whitespace-nowrap rounded-xl border border-bubble-edge bg-bubble px-4 py-2 text-xs font-semibold tracking-wide text-bubble-foreground shadow-lg">
            {line}
            <span
              aria-hidden
              className="absolute left-1/2 top-full -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-bubble-edge"
            />
          </p>
        </div>

        <div key={entrance} className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-pop">
          <BuddySprite
            slug={slug}
            mood={mood}
            startedAt={startedAt}
            onFinish={backToIdle}
            label={`${buddy.name} ${moodNames[mood]}`}
            className="size-[260px] sm:size-[320px]"
          />
        </div>
      </div>

      <div className="mt-4 px-1">
        <p className="flex items-center gap-2 font-display text-2xl font-bold leading-none text-foreground dark:text-(--buddy)" style={{ "--buddy": buddy.color } as CSSProperties}>
          <span aria-hidden className="size-2.5 rounded-full" style={{ background: buddy.color }} />
          {buddy.name}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{buddy.tagline}</p>
      </div>

      <p className="mt-4 px-1 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">APERTA E VÊ ELE REAGIR</p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {reactions.map(({ mood: reaction, label, icon: Icon }) => (
          <button
            key={reaction}
            type="button"
            onClick={() => {
              touched.current = true;
              void play(reaction, slug);
            }}
            className="group flex flex-col items-center gap-1.5 rounded-xl border bg-background/70 px-2 py-2.5 text-xs font-semibold transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:scale-95"
          >
            <Icon className="size-4 text-primary transition group-hover:scale-110" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {buddies.map((option) => {
          const active = option.slug === slug;
          return (
            <button
              key={option.slug}
              type="button"
              aria-pressed={active}
              aria-label={`Escolher ${option.name}`}
              title={option.name}
              onClick={() => {
                touched.current = true;
                if (!active) select(option.slug, false);
              }}
              className={cn(
                "relative grid size-14 shrink-0 place-items-center rounded-2xl border bg-background/70 transition hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active && "border-transparent",
              )}
              style={active ? { boxShadow: `0 0 0 2px ${option.color}` } : undefined}
            >
              <Image src={portraitUrl(option.slug)} alt="" width={48} height={48} unoptimized className="size-12" />
              {option.premium && <span aria-hidden className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-gold ring-2 ring-card" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
