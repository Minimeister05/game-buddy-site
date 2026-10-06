import { Check, Crosshair, MonitorPlay, Swords, Zap } from "lucide-react";
import { DownloadButton } from "@/components/download-button";

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

// Só entra jogo com caminho oficial e local pra saber da partida. Os que dependem do Overwolf
// (Valorant, Fortnite, tela cheia exclusiva) ficam de fora até isso mudar.
const nextGames = [
  { icon: Swords, title: "League of Legends", text: "Abate, multikill, dragão, barão e vitória, pela API oficial da Riot no seu PC." },
];

export function GamesSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <article className="flex flex-col rounded-3xl border bg-card p-6 sm:p-8">
        <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">Já funciona</span>
        <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Testado em partida de verdade</h3>
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
        <span className="w-fit rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">Próximo da fila</span>
        <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Mais jogos</h3>
        <p className="mt-2 text-muted-foreground">Cada jogo novo entra aqui só depois de testado numa partida de verdade.</p>
        <ul className="mt-6 space-y-4">
          {nextGames.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-dashed bg-background/60 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          {["Só integrações oficiais dos próprios jogos", "Nada de injetar no jogo ou ler a memória dele", "Sem risco de ban"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 text-gold" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
