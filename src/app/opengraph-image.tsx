import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: um buddy que joga junto com você`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lineup = ["kitsu", "drako", "astro", "marina", "nimbo"];

// Imagem que aparece quando alguém compartilha o link (WhatsApp, X, Discord...)
export default async function OpengraphImage() {
  const portraits = await Promise.all(
    lineup.map(async (slug) => {
      const file = await readFile(join(process.cwd(), "src/assets/og", `${slug}.png`));
      return `data:image/png;base64,${file.toString("base64")}`;
    }),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px 0",
          background: "radial-gradient(circle at 15% 0%, #3a2a6b 0%, #0b0d14 55%), #0b0d14",
          color: "#f1f2fa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#bbacfa", letterSpacing: 1 }}>game buddy.</div>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1.02, marginTop: 18, maxWidth: 900 }}>
            Um buddy que joga junto com você.
          </div>
          <div style={{ fontSize: 30, color: "#a6a9bb", marginTop: 18 }}>
            Comemora seus gols, sofre junto e chama você pra jogar. Grátis pra Windows.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", marginBottom: -24 }}>
          {portraits.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={lineup[index]} src={src} width={230} height={230} alt="" style={{ margin: "0 -6px" }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
