import React, { useState } from 'react'
import { Search, Filter, Crown } from 'lucide-react'
import Input from '../components/Input'
import Button from '../components/Button'
import ContentCard from '../components/ContentCard'
import Card from '../components/Card'
import { useApp } from '../context/AppContext'

function Discovery() {
  const { recommendations, user, upgradeUser } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = ['all', 'Drama', 'Comedy', 'Action', 'Sci-Fi', 'Fantasy', 'Documentary']

  const filteredRecommendations = recommendations.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || content.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const isPremiumFeature = user.subscriptionTier === 'free'

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-display text-text-primary mb-2">Discover Content</h1>
        <p className="text-body text-text-secondary">
          Find new movies and shows across all your streaming services
        </p>
      </div>

      {/* Premium Upgrade Banner */}
      {isPremiumFeature && (
        <Card className="border-accent border-2">
          <Card.Content>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="text-heading2 text-text-primary">Unlock Advanced Discovery</h3>
                  <p className="text-body text-text-secondary">
                    Get personalized recommendations based on your viewing habits with Premium
                  </p>
                </div>
              </div>
              <Button onClick={upgradeUser}>
                Upgrade Now
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <Card.Content>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search for movies and shows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-4 w-4 text-text-secondary" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-3 py-2 bg-bg text-text-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card>
          <Card.Content>
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-heading2 text-text-primary mb-2">No content found</h3>
              <p className="text-body text-text-secondary">
                Try adjusting your search terms or filters
              </p>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Demo Note */}
      <Card className="border-blue-600">
        <Card.Content>
          <div className="text-center">
            <h3 className="text-heading2 text-text-primary mb-2">Demo Content</h3>
            <p className="text-body text-text-secondary">
              In a production version, this would integrate with APIs like JustWatch or TMDB 
              to provide real-time content recommendations and availability data.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Discovery