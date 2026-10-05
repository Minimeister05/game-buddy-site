import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function DownloadButton({ className, center = false }: { className?: string; center?: boolean }) {
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
