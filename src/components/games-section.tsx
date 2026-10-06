import { ArrowUpRight, Check, Crosshair, Gamepad2, MonitorPlay, Zap } from "lucide-react";
import { DownloadButton } from "@/components/download-button";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const appGames = [
  {
    icon: Zap,
    title: "Rocket League",
    tag: "Reage sozinho",
    text: "Gol, gol sofrido, bola na trave e resultado, pela conexão oficial do próprio jogo. Jogue em janela sem bordas.",
  },
  {
    icon: Crosshair,
    title: "Counter-Strike 2",
    tag: "Reage sozinho",
    text: "Abate, morte, round e resultado, pela integração oficial da Valve. Jogue em janela preenchida.",
  },
  {
    icon: MonitorPlay,
    title: "Qualquer jogo em janela ou sem bordas",
    tag: "Companhia",
    text: "O buddy fica do seu lado durante a partida, e Ctrl + Alt + V faz ele comemorar no meio do jogo.",
  },
];

const overwolfGames = ["Valorant", "League of Legends", "Fortnite", "Rocket League em tela cheia", "CS2 em tela cheia"];

export function GamesSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <article className="flex flex-col rounded-3xl border bg-card p-6 sm:p-8">
        <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">Disponível hoje</span>
        <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Baixe e jogue</h3>
        <p className="mt-2 text-muted-foreground">O app sozinho, sem precisar de mais nada instalado.</p>
        <ul className="mt-6 space-y-4">
          {appGames.map(({ icon: Icon, title, tag, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border bg-background/60 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{title}</p>
                  <span className="rounded-full border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{tag}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <DownloadButton className="mt-8" />
      </article>

      <article className="relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/15 blur-3xl" />
        <span className="w-fit rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">Em breve</span>
        <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">No Overwolf</h3>
        <p className="mt-2 text-muted-foreground">
          Pra quem joga em tela cheia exclusiva: o buddy aparece dentro do jogo e reage sozinho em mais jogos.
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {overwolfGames.map((game) => (
            <li key={game} className="flex items-center gap-2.5 rounded-xl border bg-background/60 px-3 py-2.5 text-sm font-medium">
              <Gamepad2 className="size-4 text-gold" />
              {game}
            </li>
          ))}
        </ul>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          {["Funciona em tela cheia exclusiva", "Gol, kill, round e vitória automáticos", "Liberado pelos anticheats dos jogos"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 text-gold" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          {site.overwolfUrl ? (
            <Button asChild variant="outline" className="h-12 rounded-xl px-6 text-base font-semibold">
              <a href={site.overwolfUrl} target="_blank" rel="noreferrer">
                Abrir na loja do Overwolf <ArrowUpRight className="size-5" />
              </a>
            </Button>
          ) : (
            <Button variant="outline" disabled className="h-12 rounded-xl px-6 text-base font-semibold">
              Em breve na loja do Overwolf
            </Button>
          )}
        </div>
      </article>
    </div>
  );
}
