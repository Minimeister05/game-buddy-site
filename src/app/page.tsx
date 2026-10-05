import Image from "next/image";
import { ArrowDown, Download, Gift, Lock, MousePointerClick, ShieldCheck, Sparkles } from "lucide-react";
import { BuddyGallery } from "@/components/buddy-gallery";
import { BuddyStage } from "@/components/buddy-stage";
import { DownloadButton } from "@/components/download-button";
import { Faq } from "@/components/faq";
import { GamesSection } from "@/components/games-section";
import { PhraseMarquee } from "@/components/phrase-marquee";
import { SiteHeader } from "@/components/site-header";
import { buddies, portraitUrl } from "@/lib/buddies";
import { site } from "@/lib/site";

const steps = [
  { icon: Download, title: "Baixe e abra", text: "Sem instalar e sem criar conta. Extraiu, abriu, pronto." },
  { icon: MousePointerClick, title: "Escolha seu buddy", text: "Sete personagens, cada um com seu jeito, suas falas e suas manias." },
  { icon: Sparkles, title: "Bora jogar", text: "No Rocket League, no CS2 e no Minecraft ele reage sozinho à partida." },
];

const scenes = [
  { image: "/cenas/celular.webp", title: "Rolando o feed", text: "Sem jogo aberto, ele pega o celular e fica de boa.", line: null },
  { image: "/cenas/cochilo.webp", title: "Tirando um cochilo", text: "De vez em quando ele dorme. Tudo bem, você também merece.", line: null },
  { image: "/cenas/bora-jogar.webp", title: "Chamando pra jogar", text: "E quando bate a vontade, ele mesmo puxa a próxima.", line: "BORA FAZER HISTÓRIA?" },
];

const trust = [
  { icon: ShieldCheck, text: "Não mexe no jogo" },
  { icon: Lock, text: "Nada sai do seu PC" },
  { icon: Gift, text: "Grátis" },
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div aria-hidden className="glow-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem]" />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero: o produto se explica sozinho no palco */}
        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pb-20 lg:pt-16">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-mint" />
              Prévia {site.download.version} liberada · grátis pra Windows
            </span>
            <h1 className="mt-6 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              Um buddy que <span className="text-gradient">joga junto</span> com você.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
              Ele mora num cantinho da tela, comemora seus gols, sofre junto quando você toma, dança na vitória e ainda chama
              você pra jogar.
            </p>
            <DownloadButton className="mt-8" />
            <a
              href="#jogos"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Em quais jogos funciona <ArrowDown className="size-4" />
            </a>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {trust.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="size-4 text-primary" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div id="demo" className="min-w-0 scroll-mt-24">
            <BuddyStage />
          </div>
        </section>

        <PhraseMarquee />

        <section id="como-funciona" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
          <SectionTitle eyebrow="COMO FUNCIONA" title="Três passos e ele tá do seu lado." />
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-7">
                <span className="absolute right-5 top-3 font-display text-7xl font-extrabold text-primary/10">{index + 1}</span>
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <SectionTitle
            eyebrow="FORA DO JOGO"
            title="E quando você não tá jogando, ele tem vida própria."
            text="Sem jogo aberto, o buddy segue a rotina dele. Dá pra desligar quando quiser."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {scenes.map((scene) => (
              <figure key={scene.title} className="overflow-hidden rounded-3xl border bg-card">
                <div className="relative grid place-items-center bg-stage px-6 pb-2 pt-10">
                  {scene.line && (
                    <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-xl border border-bubble-edge bg-bubble px-3 py-1.5 text-[11px] font-semibold tracking-wide text-bubble-foreground">
                      {scene.line}
                    </span>
                  )}
                  <Image src={scene.image} alt={scene.title} width={520} height={520} unoptimized className="size-56" />
                </div>
                <figcaption className="p-6">
                  <p className="font-display text-lg font-bold">{scene.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{scene.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="jogos" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
          <SectionTitle
            eyebrow="JOGOS"
            title="Onde ele joga com você."
            text="Baixe o app pra começar agora. Pra tela cheia exclusiva e mais jogos, a versão Overwolf tá chegando."
          />
          <GamesSection />
        </section>

        <section id="buddies" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
          <SectionTitle
            eyebrow="BUDDIES"
            title="Escolha sua companhia."
            text="Clique em um pra ver ele no palco lá em cima."
          />
          <BuddyGallery />
        </section>

        <section id="duvidas" className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
          <SectionTitle eyebrow="DÚVIDAS" title="Perguntas rápidas." />
          <Faq />
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border bg-card px-6 pb-12 pt-10 text-center sm:px-12">
            <div aria-hidden className="glow-backdrop pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative mx-auto flex max-w-md justify-center -space-x-6 sm:-space-x-4">
              {buddies.map((buddy, index) => (
                <Image
                  key={buddy.slug}
                  src={portraitUrl(buddy.slug)}
                  alt=""
                  width={260}
                  height={260}
                  unoptimized
                  className="size-20 animate-float sm:size-24"
                  style={{ animationDelay: `${index * 0.35}s` }}
                />
              ))}
            </div>
            <h2 className="relative mt-6 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              Bora jogar junto?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-muted-foreground">
              Baixe, escolha seu buddy e manda um print dele comemorando pra gente.
            </p>
            <DownloadButton center className="relative mt-8" />
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <span className="font-display font-bold text-foreground">game buddy.</span> Feito no Brasil pra jogar junto.
          </p>
          <p className="text-xs">Não é afiliado à Psyonix, Epic Games, Valve, Riot Games ou Overwolf.</p>
        </div>
      </footer>
    </div>
  );
}
