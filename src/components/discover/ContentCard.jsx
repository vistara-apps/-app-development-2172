import { Play, Plus, Star } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export function ContentCard({ content, onAddToWatchlist }) {
  const availability = content.streamAvailability || [];

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[2/3] bg-gray-700 rounded-md mb-4 relative">
        {content.image ? (
          <img 
            src={content.image} 
            alt={content.title}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play size={32} className="text-text-secondary" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center">
          <Star size={12} className="text-yellow-400 mr-1" />
          <span className="text-xs text-white">{content.rating || "N/A"}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-text-primary truncate">{content.title}</h3>
          <p className="text-text-secondary text-sm">{content.year} • {content.genre}</p>
        </div>

        {availability.length > 0 && (
          <div>
            <p className="text-caption text-text-secondary mb-2">Available on:</p>
            <div className="flex flex-wrap gap-1">
              {availability.slice(0, 3).map((service, index) => (
                <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                  {service}
                </span>
              ))}
              {availability.length > 3 && (
                <span className="px-2 py-1 bg-bg text-text-secondary text-xs rounded">
                  +{availability.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <Button 
          variant="secondary" 
          onClick={() => onAddToWatchlist(content)}
          className="w-full flex items-center justify-center"
        >
          <Plus size={16} className="mr-2" />
          Add to Watchlist
        </Button>
      </div>
    </Card>
  );
}