import React from 'react'
import { Plus, Check, Star } from 'lucide-react'
import Card from './Card'
import Button from './Button'
import { useApp } from '../context/AppContext'

function ContentCard({ content, variant = 'discovery' }) {
  const { addToWatchlist, watchlistItems } = useApp()

  const isInWatchlist = watchlistItems.some(
    item => item.contentTitle === content.title
  )

  const handleAddToWatchlist = () => {
    if (!isInWatchlist) {
      addToWatchlist(content)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-800 flex items-center justify-center">
        <div className="text-center text-text-secondary">
          <div className="text-2xl font-bold mb-2">{content.title}</div>
          <div className="text-sm">{content.genre}</div>
        </div>
      </div>
      <Card.Content>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-heading2 text-text-primary">{content.title}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-caption text-text-secondary">{content.rating}</span>
            </div>
          </div>
          
          <p className="text-body text-text-secondary">{content.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {content.availableOn?.map((service) => (
              <span
                key={service}
                className="px-2 py-1 bg-primary bg-opacity-20 text-primary text-caption rounded-md"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button
          variant={isInWatchlist ? 'secondary' : 'primary'}
          className="w-full"
          onClick={handleAddToWatchlist}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              In Watchlist
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add to Watchlist
            </>
          )}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default ContentCard