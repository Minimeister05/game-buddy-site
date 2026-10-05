import { buddies } from "@/lib/buddies";

// As falas reais dos buddies passando: dá o tom antes de qualquer explicação.
const phrases = buddies.flatMap((buddy) =>
  [buddy.lines.goal[0], buddy.lines.victory[1], buddy.lines.scared[0]].map((text) => ({ text, color: buddy.color })),
);

export function PhraseMarquee() {
  const row = [...phrases, ...phrases];
  return (
    <div aria-hidden className="marquee-mask relative overflow-hidden py-3">
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {row.map((phrase, index) => (
          <span
            key={index}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border bg-card px-4 py-2 text-xs font-semibold tracking-wide shadow-sm"
          >
            <span className="size-2 rounded-full" style={{ background: phrase.color }} />
            {phrase.text}
          </span>
        ))}
      </div>
    </div>
  );
}
