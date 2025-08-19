import { Play, Trash2, ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { format } from "date-fns";

export function WatchlistItem({ item, onRemove }) {
  const availability = item.streamAvailability || [];

  return (
    <Card className="flex items-center space-x-4">
      <div className="w-16 h-24 bg-gray-700 rounded-md flex-shrink-0 flex items-center justify-center">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <Play size={20} className="text-text-secondary" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-text-primary truncate">{item.title}</h3>
        <p className="text-text-secondary text-sm mb-2">
          Added {format(new Date(item.addedDate), 'MMM dd, yyyy')}
        </p>
        
        {availability.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {availability.map((service, index) => (
              <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                {service}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-text-secondary text-sm">Not available on your services</span>
        )}
      </div>

      <div className="flex space-x-2">
        {availability.length > 0 && (
          <Button variant="primary" className="p-2">
            <ExternalLink size={16} />
          </Button>
        )}
        <Button variant="destructive" onClick={() => onRemove(item.id)} className="p-2">
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
}