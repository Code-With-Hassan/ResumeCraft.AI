import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Video } from "lucide-react";

interface AdPlaceholderProps {
    adsWatched: number;
    onWatchAd: () => void;
}

export default function AdPlaceholder({ adsWatched, onWatchAd }: AdPlaceholderProps) {
  const progress = (adsWatched / 3) * 100;

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="h-48 w-full bg-secondary/50 flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 text-center">
          <p className="text-muted-foreground text-sm font-semibold mb-2">Unlock PDF Downloads</p>
          <p className="text-xs text-muted-foreground mb-4">Watch 3 rewarded ads to enable PDF downloads for your resume.</p>
          
          <div className="w-full max-w-xs">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs font-bold text-primary mb-4">{adsWatched} of 3 ads watched</p>
            <Button onClick={onWatchAd} disabled={adsWatched >= 3} className="w-full">
                <Video className="mr-2 h-4 w-4" />
                {adsWatched >= 3 ? "All Ads Watched!" : "Watch a Rewarded Ad"}
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
