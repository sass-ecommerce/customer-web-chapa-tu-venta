import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FeatureUnavailable({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <Card data-slot="feature-unavailable" className="text-center">
      <CardContent className="flex flex-col items-center gap-3 py-10">
        <span className="bg-muted text-muted-foreground flex h-12 w-12 items-center justify-center rounded-full">
          <Wrench size={20} />
        </span>
        <h2 className="font-display text-brand-dark text-xl font-bold">
          {title}
        </h2>
        <p className="max-w-xs text-sm text-gray-500">{message}</p>
      </CardContent>
    </Card>
  );
}
