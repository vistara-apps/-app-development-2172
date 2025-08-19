import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ContentCard } from "../components/discover/ContentCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { mockContent } from "../data/mockContent";

const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Fantasy", "Adventure"];

export function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const [subscriptions] = useLocalStorage('subscriptions', []);

  const userServices = subscriptions.map(sub => sub.serviceName);

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || item.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const handleAddToWatchlist = (content) => {
    const isAlreadyInWatchlist = watchlist.some(item => item.contentId === content.id);
    
    if (!isAlreadyInWatchlist) {
      const watchlistItem = {
        id: Date.now(),
        contentId: content.id,
        title: content.title,
        image: content.image,
        streamAvailability: content.streamAvailability,
        addedDate: new Date().toISOString()
      };
      setWatchlist(prev => [...prev, watchlistItem]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">Discover</h1>
        <p className="text-text-secondary">Find new content across your streaming services</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            type="text"
            placeholder="Search movies and shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-text-secondary" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3 py-2 bg-surface border border-text-secondary/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Recommendations */}
      <div>
        <h2 className="text-heading1 mb-4">
          {searchTerm ? `Search Results (${filteredContent.length})` : 'Trending Now'}
        </h2>
        
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No content found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredContent.map(content => (
              <ContentCard
                key={content.id}
                content={content}
                onAddToWatchlist={handleAddToWatchlist}
              />
            ))}
          </div>
        )}
      </div>

      {/* Available on Your Services */}
      {userServices.length > 0 && (
        <div>
          <h2 className="text-heading1 mb-4">Available on Your Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockContent
              .filter(content => 
                content.streamAvailability.some(service => userServices.includes(service))
              )
              .slice(0, 10)
              .map(content => (
                <ContentCard
                  key={`available-${content.id}`}
                  content={content}
                  onAddToWatchlist={handleAddToWatchlist}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}