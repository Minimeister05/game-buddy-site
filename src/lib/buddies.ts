// Os buddies do app. Desenhos, animações e falas vêm do próprio Game Buddy:
// as folhas em public/buddies foram exportadas do app (48 quadros, 8 x 6).

export type Mood = "idle" | "goal" | "conceded" | "victory" | "defeat" | "scared";
export type Reaction = Exclude<Mood, "idle">;

export type Buddy = {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  premium: boolean;
  lines: Record<Reaction, [string, string, string]>;
};

// Mesma duração do app (AnimationTiming.Duration), em segundos.
export const moodDuration: Record<Mood, number> = {
  idle: 6,
  goal: 4.2,
  conceded: 4.8,
  victory: 6.4,
  defeat: 6,
  scared: 4.2,
};

export const sheet = { columns: 8, rows: 6, frames: 48 };

export const sheetUrl = (slug: string, mood: Mood) => `/buddies/${slug}/${mood}.webp`;
export const portraitUrl = (slug: string) => `/buddies/${slug}/retrato.webp`;

const classicLines: Buddy["lines"] = {
  goal: ["CALCULADO!", "SEGURA ESSA!", "É CAIXA!"],
  conceded: ["ACORDA, TIME!", "EU NÃO VI NADA.", "DÁ PRA BUSCAR!"],
  victory: ["RESPEITA!", "GG, MEU PARCEIRO!", "TÁ PAGO!"],
  defeat: ["MELHOR DE 3?", "ERA AQUECIMENTO.", "EU NEM QUERIA."],
  scared: ["EU NÃO TÔ AQUI!", "FOI SÓ UM SUSTO!", "QUEM APAGOU A LUZ?"],
};

export const buddies: Buddy[] = [
  { slug: "astro", name: "Astro", tagline: "Seu pequeno explorador de grandes partidas.", color: "#BCA4FF", premium: false, lines: classicLines },
  { slug: "mochi", name: "Mochi", tagline: "Nove vidas. Uma torcida inteira por você.", color: "#8FE4C4", premium: false, lines: classicLines },
  { slug: "bolt", name: "Bolt", tagline: "Carregado de energia. Programado para torcer.", color: "#FFD083", premium: false, lines: classicLines },
  {
    slug: "drako",
    name: "Drako",
    tagline: "Seu pequeno caos. Fogo na vitória.",
    color: "#D8ACFF",
    premium: true,
    lines: {
      goal: ["ESQUENTOU, HEIN?", "GOL SAINDO DO FORNO!", "FOGO NA REDE!"],
      conceded: ["SOLTEI ATÉ FUMAÇA.", "ISSO NÃO FICA ASSIM.", "CADÊ MINHA DEFESA?"],
      victory: ["RESPEITA O DRAGÃO!", "ESSE TESOURO É MEU!", "GG. AGORA É MEU!"],
      defeat: ["EU QUERO REVANCHE.", "TAVA SÓ AQUECENDO.", "MEU FOGO NÃO ACABOU."],
      scared: ["FOI O VENTO.", "NÃO CONTA PRA NINGUÉM.", "ASA É ESCUDO, TÁ?"],
    },
  },
  {
    slug: "kitsu",
    name: "Kitsu",
    tagline: "Três caudas. Mil truques. Uma dupla imbatível.",
    color: "#FFB589",
    premium: true,
    lines: {
      goal: ["FOI MAGIA? FOI GOL!", "TRUQUE DE MESTRE!", "A REDE CAIU NO FEITIÇO!"],
      conceded: ["ESSE TRUQUE EU NÃO SEI.", "SUMIU MINHA SORTE!", "VOU TROCAR O AMULETO."],
      victory: ["LENDA DA FLORESTA!", "TRÊS CAUDAS, UM GG!", "A SORTE JOGA COM A GENTE!"],
      defeat: ["TODO MESTRE RECOMEÇA.", "AINDA TENHO UM TRUQUE.", "BORA VIRAR ESSA LENDA?"],
      scared: ["CADÊ? VIREI FOLHA!", "NÃO VIU RAPOSA NENHUMA.", "ERA PARTE DO TRUQUE!"],
    },
  },
  {
    slug: "nimbo",
    name: "Nimbo",
    tagline: "Pode vir a tempestade. A gente abre o céu.",
    color: "#A6DAFF",
    premium: true,
    lines: {
      goal: ["CAIU UM RAIO NA REDE!", "GOL DE TROVÃO!", "TEMPESTADE DE GOLAÇO!"],
      conceded: ["FECHOU O TEMPO...", "PREVISÃO: REVANCHE.", "FOI UMA NUVEM PASSAGEIRA."],
      victory: ["ABRIU O CÉU!", "CHUVA DE GG!", "SOL PRA NOSSA DUPLA!"],
      defeat: ["DEPOIS DA CHUVA, A GENTE.", "ATÉ A CHUVA FAZ CRESCER.", "AMANHÃ TEM CÉU NOVO."],
      scared: ["TROVÃO? EU NEM GRITEI!", "CADÊ MEU GUARDA-CHUVA?", "SUSTO COM CHANCE DE CHUVA."],
    },
  },
  {
    slug: "marina",
    name: "Marina",
    tagline: "Oito braços e uma batida só: a da sua vitória.",
    color: "#F2A6DE",
    premium: true,
    lines: {
      goal: ["SOLTA O BEAT DO GOL!", "ESSA FOI NO RITMO!", "GOLAÇO EM OITO CANAIS!"],
      conceded: ["QUEM TIROU DO RITMO?", "DEU NÓ NOS MEUS CABOS.", "SEGURA, VOU REMIXAR."],
      victory: ["GG NA PISTA TODA!", "OITO BRAÇOS PRO ALTO!", "ESSA VITÓRIA VIROU HIT!"],
      defeat: ["PRÓXIMA FAIXA: REVANCHE.", "VOU VIRAR ESSE DISCO.", "A GENTE AINDA VIRA HIT."],
      scared: ["SOLTEI TINTA NO DROP!", "ISSO NÃO TAVA NO SET!", "FOI O GRAVE, JURO!"],
    },
  },
];

export const findBuddy = (slug: string) => buddies.find((b) => b.slug === slug) ?? buddies[0];
