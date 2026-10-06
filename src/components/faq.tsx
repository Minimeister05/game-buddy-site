import { Plus } from "lucide-react";

const questions = [
  {
    q: "Dá ban?",
    a: "Não. O Game Buddy não mexe no jogo, não injeta nada e não lê a memória dele. No Rocket League e no CS2 ele usa as integrações oficiais dos próprios jogos.",
  },
  {
    q: "Quando dá pra baixar?",
    a: "Logo. A prévia tá fechada com os primeiros jogadores e streamers pra gente acertar tudo antes. Quando abrir, o botão aparece aqui no site.",
  },
  {
    q: "Funciona na minha live?",
    a: "Funciona. No modo streamer ele entra no OBS como fonte de navegador e agradece follow, sub, bits, raid e resgate de pontos da Twitch, falando o nome de quem mandou. YouTube, Kick e doações estão chegando.",
  },
  {
    q: "Preciso instalar mais alguma coisa?",
    a: "Não. O app funciona sozinho: não precisa de Overwolf nem de conta.",
  },
  {
    q: "Apareceu “O Windows protegeu o computador”. E agora?",
    a: "É porque o app é novinho e ainda não tem assinatura digital. Clique em Mais informações e depois em Executar assim mesmo.",
  },
  {
    q: "Funciona em tela cheia?",
    a: "Em janela e em janela sem bordas, sempre. Em tela cheia depende do jogo: quando ele usa tela cheia exclusiva, como o Rocket League, o Windows esconde qualquer janela por cima. Aí use janela sem bordas, que fica igual na tela.",
  },
  {
    q: "É grátis?",
    a: "É. Astro, Mochi e Bolt são grátis, e os premium (Drako, Kitsu, Nimbo e Marina) estão liberados durante a prévia.",
  },
  {
    q: "Ele manda meus dados pra algum lugar?",
    a: "Não. Tudo roda no seu PC. No modo streamer, o app só conversa direto com a Twitch pra receber os alertas da sua live.",
  },
];

export function Faq() {
  return (
    <div className="divide-y rounded-3xl border bg-card">
      {questions.map(({ q, a }) => (
        <details key={q} className="group px-5 py-1 sm:px-7 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold">
            {q}
            <Plus className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="pb-5 text-muted-foreground">{a}</p>
        </details>
      ))}
    </div>
  );
}
