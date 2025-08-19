import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { WatchlistItem } from "../components/watchlist/WatchlistItem";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function Watchlist() {
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [subscriptions] = useLocalStorage('subscriptions', []);

  const userServices = subscriptions.map(sub => sub.serviceName);

  const filteredWatchlist = watchlist.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "available") {
      return matchesSearch && item.streamAvailability?.some(service => userServices.includes(service));
    } else if (filter === "unavailable") {
      return matchesSearch && !item.streamAvailability?.some(service => userServices.includes(service));
    }
    
    return matchesSearch;
  });

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const availableCount = watchlist.filter(item => 
    item.streamAvailability?.some(service => userServices.includes(service))
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">My Watchlist</h1>
        <p className="text-text-secondary">
          {watchlist.length} items • {availableCount} available on your services
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            type="text"
            placeholder="Search your watchlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-text-secondary" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-text-secondary/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Items</option>
            <option value="available">Available Now</option>
            <option value="unavailable">Not Available</option>
          </select>
        </div>
      </div>

      {/* Watchlist Items */}
      {filteredWatchlist.length === 0 ? (
        <Card className="text-center py-12">
          {watchlist.length === 0 ? (
            <>
              <p className="text-text-secondary mb-4">Your watchlist is empty</p>
              <p className="text-text-secondary text-sm">
                Add content from the Discover page to build your watchlist
              </p>
            </>
          ) : (
            <p className="text-text-secondary">No items match your search criteria</p>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredWatchlist.map(item => (
            <WatchlistItem
              key={item.id}
              item={item}
              onRemove={handleRemoveFromWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}