// Configuração central do site — muda aqui e reflete no SEO, imagem de compartilhamento e páginas.
export const site = {
  name: "Game Buddy",
  description:
    "Um buddy que mora na sua tela e joga junto com você: comemora seus gols, sofre junto e agradece quem apoia sua live. Grátis pra Windows.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "pt_BR",
  initial: "G",
  // Enquanto a prévia estiver fechada com os testers, open fica false e os botões mostram "Em breve".
  // Pra abrir: coloca o zip em public/downloads, ajusta href, version e size e muda open pra true.
  download: {
    open: false as boolean,
    version: "0.10",
    href: "/downloads/GameBuddy-0.10-Windows.zip",
    size: "172 KB",
    requirements: "Windows 10 ou 11",
  },
};
