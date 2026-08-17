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
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground">
          <Wrench size={20} />
        </span>
        <h2 className="font-display text-xl font-bold text-brand-dark">
          {title}
        </h2>
        <p className="text-gray-500 text-sm max-w-xs">{message}</p>
      </CardContent>
    </Card>
  );
}
