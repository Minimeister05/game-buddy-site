// Configuração central do site — muda aqui e reflete no SEO, imagem de compartilhamento e páginas.
export const site = {
  name: "Game Buddy",
  description:
    "Um buddy que mora na sua tela e joga junto com você: comemora seus gols, sofre junto e chama você pra jogar. Grátis pra Windows.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "pt_BR",
  initial: "G",
  // Versão pra baixar. Trocou o zip em public/downloads? Atualiza aqui.
  download: {
    version: "0.7",
    href: "/downloads/GameBuddy-0.7-Windows.zip",
    size: "138 KB",
    requirements: "Windows 10 ou 11",
  },
  // Link da página na loja do Overwolf. Enquanto for null, o site mostra "em breve".
  overwolfUrl: null as string | null,
};
