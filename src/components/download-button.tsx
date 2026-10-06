import { Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function DownloadButton({ className, center = false }: { className?: string; center?: boolean }) {
  if (!site.download.open) {
    return (
      <div className={cn("flex flex-col gap-2.5", center ? "items-center" : "items-start", className)}>
        <span
          aria-disabled="true"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-dashed border-primary/50 bg-primary/10 px-6 text-base font-semibold text-primary"
        >
          <Clock className="size-5" />
          Em breve pra Windows
        </span>
        <p className="text-xs text-muted-foreground">Prévia fechada com os primeiros testers · grátis · {site.download.requirements}</p>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-2.5", center ? "items-center" : "items-start", className)}>
      <Button
        asChild
        className="h-12 rounded-xl px-6 text-base font-semibold shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary/90"
      >
        <a href={site.download.href} download>
          <Download className="size-5" />
          Baixar grátis pra Windows
        </a>
      </Button>
      <p className="text-xs text-muted-foreground">
        Prévia {site.download.version} · {site.download.size} · {site.download.requirements} · sem instalar
      </p>
    </div>
  );
}
