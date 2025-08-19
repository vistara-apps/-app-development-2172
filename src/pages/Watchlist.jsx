import React from 'react'
import { Trash2, ExternalLink, Crown } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { useApp } from '../context/AppContext'
import { format } from 'date-fns'

function Watchlist() {
  const { watchlistItems, removeFromWatchlist, user, upgradeUser } = useApp()

  const isPremiumFeature = user.subscriptionTier === 'free'

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-display text-text-primary mb-2">My Watchlist</h1>
        <p className="text-body text-text-secondary">
          Keep track of what you want to watch across all your services
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
                  <h3 className="text-heading2 text-text-primary">Unified Watchlist Sync</h3>
                  <p className="text-body text-text-secondary">
                    Sync your watchlist across all streaming platforms with Premium
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

      {/* Watchlist Items */}
      {watchlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlistItems.map((item) => (
            <Card key={item.watchlistItemId}>
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center text-text-secondary">
                  <div className="text-xl font-bold">{item.contentTitle}</div>
                </div>
              </div>
              <Card.Content>
                <div className="space-y-3">
                  <h3 className="text-heading2 text-text-primary">{item.contentTitle}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.streamAvailability.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-primary bg-opacity-20 text-primary text-caption rounded-md"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-caption text-text-secondary">
                    Added {format(item.addedDate, 'MMM dd, yyyy')}
                  </p>
                </div>
              </Card.Content>
              <Card.Footer>
                <div className="flex space-x-2">
                  <Button variant="secondary" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Watch Now
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromWatchlist(item.watchlistItemId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Card.Content>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-heading2 text-text-primary mb-2">Your watchlist is empty</h3>
              <p className="text-body text-text-secondary mb-6">
                Start adding content from the Discovery page to build your watchlist
              </p>
              <Button onClick={() => window.location.href = '/discovery'}>
                Discover Content
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Demo Note */}
      <Card className="border-blue-600">
        <Card.Content>
          <div className="text-center">
            <h3 className="text-heading2 text-text-primary mb-2">Watchlist Synchronization</h3>
            <p className="text-body text-text-secondary">
              In a production version, this would sync with your actual streaming service watchlists 
              and provide direct links to watch content on the appropriate platforms.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Watchlist