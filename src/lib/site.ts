// Configuração central do site — muda aqui e reflete no SEO, imagem de compartilhamento e páginas.
export const site = {
  name: "Gamebuddy Site",
  description: "Um buddy que mora na sua tela e reage às suas partidas. Grátis para Windows.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "pt_BR",
  initial: "G",
};
