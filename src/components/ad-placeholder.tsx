import { Card, CardContent } from "@/components/ui/card";

export default function AdPlaceholder() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="h-48 w-full bg-secondary/50 flex items-center justify-center rounded-md border-2 border-dashed">
          <p className="text-muted-foreground text-sm font-semibold">Advertisement</p>
        </div>
      </CardContent>
    </Card>
  );
}
