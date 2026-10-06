"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, Gem, Gift, Radio, Swords, UserPlus, type LucideIcon } from "lucide-react";
import { BuddySprite } from "@/components/buddy-sprite";
import { findBuddy, moodDuration, sheetUrl, type Mood, type Reaction } from "@/lib/buddies";
import { cn } from "@/lib/utils";

// As mesmas falas que o app monta com o nome de quem apoiou (src/StreamAlerts.cs).
const alerts: { mood: Reaction; line: string; event: string; icon: LucideIcon }[] = [
  { mood: "goal", line: "VALEU PELO FOLLOW, ANA!", event: "ana_joga seguiu o canal", icon: UserPlus },
  { mood: "victory", line: "FULANO DEU 5 SUBS!", event: "fulano deu 5 subs de presente", icon: Gift },
  { mood: "goal", line: "100 BITS! VALEU, BIA!", event: "bia mandou 100 bits", icon: Gem },
  { mood: "scared", line: "INVASÃO! CAIO TROUXE 42!", event: "caio chegou com uma raid de 42", icon: Swords },
];

const features = [
  "Follow, sub, sub de presente, bits, raid e resgate de pontos",
  "Fundo transparente: é só colar o link no OBS",
  "No balão aparece só o nome. A mensagem do chat nunca",
  "Login pelo site da Twitch. Sua senha nunca passa pelo app",
];

const slug = "marina";

export function StreamerSection() {
  const buddy = findBuddy(slug);
  const [mood, setMood] = useState<Mood>("idle");
  const [startedAt, setStartedAt] = useState(0);
  const [current, setCurrent] = useState(-1);
  const [history, setHistory] = useState<number[]>([]);
  const [bubble, setBubble] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    (["idle", "goal", "victory", "scared"] as Mood[]).forEach((which) => {
      const image = new window.Image();
      image.src = sheetUrl(slug, which);
    });
    const clear = () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
    // Sem animação pedida pelo sistema: mostra um alerta parado, com o balão.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.current.push(
        window.setTimeout(() => {
          setCurrent(1);
          setHistory([1, 0]);
          setMood("victory");
          setBubble(true);
        }, 0),
      );
      return clear;
    }
    let step = 0;
    const next = (delay: number) => {
      timers.current.push(
        window.setTimeout(() => {
          if (document.hidden) return next(2000);
          const index = step++ % alerts.length;
          const alert = alerts[index];
          const duration = moodDuration[alert.mood] * 1000;
          setCurrent(index);
          setHistory((list) => [index, ...list].slice(0, 3));
          setMood(alert.mood);
          setStartedAt(performance.now());
          setBubble(false);
          timers.current.push(window.setTimeout(() => setBubble(true), 320));
          timers.current.push(window.setTimeout(() => setBubble(false), duration - 720));
          next(duration + 1600);
        }, delay),
      );
    };
    next(1200);
    return clear;
  }, []);

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">MODO STREAMER</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
          Seu buddy também <span className="text-gradient">faz live</span>.
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
          Coloca ele no OBS e ele agradece cada pessoa que apoia o canal, falando o nome de quem mandou. Do primeiro follow
          até a raid.
        </p>
        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm sm:text-base">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                <Check className="size-3.5" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1.5 text-mint">
            <Radio className="size-3.5" /> Twitch: funcionando
          </span>
          <span className="rounded-full border px-3 py-1.5 text-muted-foreground">YouTube, Kick e doações: em breve</span>
        </div>
      </div>

      <div className="min-w-0 rounded-[2rem] border bg-card/70 p-3 shadow-2xl shadow-primary/15 backdrop-blur sm:p-4">
        <div
          className="relative isolate aspect-video overflow-hidden rounded-[1.4rem] border bg-stage"
          style={{ "--buddy": buddy.color } as CSSProperties}
        >
          <div aria-hidden className="arena-floor absolute inset-x-[-25%] bottom-[-45%] h-[80%]" />
          <div aria-hidden className="absolute left-1/2 top-3 hidden -translate-x-1/2 rounded-full sm:block bg-background/70 px-3 py-1 font-display text-xs font-bold tabular-nums">
            2 <span className="text-muted-foreground">×</span> 1
          </div>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-destructive px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-white">
            <span className="size-1.5 animate-pulse rounded-full bg-white" /> AO VIVO
          </span>
          <span className="absolute left-3 top-10 rounded-md bg-background/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            128 assistindo
          </span>

          <div className="absolute bottom-0 left-1/2 flex w-[44%] -translate-x-1/2 flex-col items-center sm:left-auto sm:right-[2%] sm:translate-x-0">
            <div
              aria-live="polite"
              className={cn("z-10 mb-[-6%] transition-all duration-300", bubble ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
            >
              <p className="relative whitespace-nowrap rounded-xl border border-bubble-edge bg-bubble px-3 py-1.5 text-[10px] font-semibold tracking-wide text-bubble-foreground shadow-lg sm:text-xs">
                {current >= 0 ? alerts[current].line : ""}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-bubble-edge"
                />
              </p>
            </div>
            <BuddySprite slug={slug} mood={mood} startedAt={startedAt} label={`${buddy.name} reagindo à live`} className="aspect-square w-full" />
          </div>
        </div>

        <ul className="mt-3 grid gap-2 sm:grid-cols-3" aria-label="Últimos alertas da live">
          {history.map((index, position) => {
            const { icon: Icon, event } = alerts[index];
            return (
              <li
                key={`${index}-${position}`}
                className={cn(
                  "flex min-w-0 items-center gap-2 rounded-xl border bg-background/60 px-3 py-2 text-xs transition-opacity",
                  position === 0 ? "border-primary/40 text-foreground" : "hidden text-muted-foreground opacity-70 sm:flex",
                )}
              >
                <Icon className={cn("size-4 shrink-0", position === 0 ? "text-primary" : "text-muted-foreground")} />
                <span className="truncate">{event}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
