import React, { useState } from 'react'
import { Plus, Check, Star, Play, Info, ExternalLink, Eye } from 'lucide-react'
import Card from './Card'
import Button from './Button'
import Modal from './Modal'
import SkeletonLoader from './SkeletonLoader'
import Tooltip from './Tooltip'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/cn'

/**
 * ContentCard component for displaying media content
 * 
 * @param {Object} content - The content to display
 * @param {string} variant - Card variant (discovery, watchlist, etc.)
 * @param {boolean} isLoading - Whether the card is in loading state
 */
function ContentCard({ 
  content, 
  variant = 'discovery',
  isLoading = false
}) {
  const { addToWatchlist, watchlistItems, user } = useApp()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false)

  const isInWatchlist = watchlistItems.some(
    item => item.contentTitle === content?.title
  )

  const handleAddToWatchlist = () => {
    if (!isInWatchlist && content) {
      setIsAddingToWatchlist(true)
      
      // Simulate API call
      setTimeout(() => {
        addToWatchlist(content)
        setIsAddingToWatchlist(false)
      }, 600)
    }
  }
  
  // Generate random placeholder image for demo
  const placeholderImage = `https://picsum.photos/seed/${content?.title || Math.random()}/800/450`
  
  // Determine if content is available on user's subscriptions
  const isAvailableOnUserSubscriptions = content?.availableOn?.some(
    service => user?.subscriptions?.some(sub => sub.serviceName === service)
  )

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <SkeletonLoader variant="image" className="aspect-video" />
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <SkeletonLoader variant="heading" width={180} />
              <SkeletonLoader variant="text" width={50} />
            </div>
            <SkeletonLoader variant="text" count={2} className="space-y-2" />
            <div className="flex gap-2">
              <SkeletonLoader variant="text" width={60} height={24} />
              <SkeletonLoader variant="text" width={80} height={24} />
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <SkeletonLoader variant="button" className="w-full" />
        </Card.Footer>
      </Card>
    )
  }
  
  if (!content) return null

  return (
    <>
      <Card 
        className="overflow-hidden group"
        hover
        interactive={variant !== 'watchlist'}
        onClick={() => variant !== 'watchlist' && setIsDetailsOpen(true)}
      >
        {/* Image */}
        <div className="relative aspect-video bg-bg overflow-hidden">
          <img 
            src={placeholderImage} 
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
            <div>
              <h3 className="text-white font-semibold text-lg">{content.title}</h3>
              <p className="text-white/80 text-sm">{content.genre}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-black/30 text-white hover:bg-black/50"
              onClick={(e) => {
                e.stopPropagation()
                setIsDetailsOpen(true)
              }}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
            <Star className="h-3 w-3 text-warning fill-current" />
            <span>{content.rating}</span>
          </div>
          
          {/* Available on user's subscription badge */}
          {isAvailableOnUserSubscriptions && (
            <div className="absolute top-2 left-2 bg-success-muted text-success px-2 py-1 rounded-md text-xs font-medium">
              Available Now
            </div>
          )}
        </div>
        
        <Card.Content>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-heading3 text-text-primary line-clamp-1">{content.title}</h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-caption text-text-secondary">{content.rating}</span>
              </div>
            </div>
            
            <p className="text-body-small text-text-secondary line-clamp-2">{content.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {content.availableOn?.map((service) => (
                <span
                  key={service}
                  className={cn(
                    "px-2 py-1 text-caption rounded-md",
                    user?.subscriptions?.some(sub => sub.serviceName === service)
                      ? "bg-success-muted text-success"
                      : "bg-primary bg-opacity-20 text-primary"
                  )}
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
            onClick={(e) => {
              e.stopPropagation()
              handleAddToWatchlist()
            }}
            disabled={isInWatchlist}
            isLoading={isAddingToWatchlist}
            leftIcon={isInWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          >
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </Button>
        </Card.Footer>
      </Card>
      
      {/* Content Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={content.title}
        size="lg"
      >
        <div className="space-y-6">
          {/* Hero image */}
          <div className="relative aspect-video rounded-md overflow-hidden">
            <img 
              src={placeholderImage} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full w-14 h-14 flex items-center justify-center"
                leftIcon={<Play className="h-6 w-6 ml-1" />}
              />
            </div>
          </div>
          
          {/* Content details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-heading1 text-text-primary">{content.title}</h2>
                  <div className="flex items-center space-x-1 bg-warning-muted text-warning px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{content.rating}</span>
                  </div>
                </div>
                <p className="text-body text-text-secondary">{content.description}</p>
              </div>
              
              <div>
                <h3 className="text-heading3 text-text-primary mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-caption text-text-secondary">Genre:</span>
                    <p className="text-body text-text-primary">{content.genre}</p>
                  </div>
                  <div>
                    <span className="text-caption text-text-secondary">Release Year:</span>
                    <p className="text-body text-text-primary">2023</p>
                  </div>
                  <div>
                    <span className="text-caption text-text-secondary">Duration:</span>
                    <p className="text-body text-text-primary">120 min</p>
                  </div>
                  <div>
                    <span className="text-caption text-text-secondary">Director:</span>
                    <p className="text-body text-text-primary">Jane Doe</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-heading3 text-text-primary mb-2">Cast</h3>
                <p className="text-body text-text-secondary">John Smith, Sarah Johnson, Michael Brown</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-heading3 text-text-primary mb-2">Where to Watch</h3>
                <div className="space-y-2">
                  {content.availableOn?.map((service) => (
                    <div 
                      key={service}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md",
                        user?.subscriptions?.some(sub => sub.serviceName === service)
                          ? "bg-success-muted"
                          : "bg-bg"
                      )}
                    >
                      <div className="flex items-center">
                        <span className="text-body font-medium">
                          {service}
                        </span>
                        {user?.subscriptions?.some(sub => sub.serviceName === service) && (
                          <Tooltip content="Available with your subscription">
                            <Check className="h-4 w-4 text-success ml-2" />
                          </Tooltip>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
                      >
                        Watch
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-border-dark">
                <Button
                  variant={isInWatchlist ? 'secondary' : 'primary'}
                  className="w-full mb-3"
                  onClick={handleAddToWatchlist}
                  disabled={isInWatchlist}
                  isLoading={isAddingToWatchlist}
                  leftIcon={isInWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                >
                  {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Eye className="h-4 w-4" />}
                >
                  Mark as Watched
                </Button>
              </div>
            </div>
          </div>
          
          {/* Similar content */}
          <div className="pt-6 border-t border-border-dark">
            <h3 className="text-heading3 text-text-primary mb-4">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-bg rounded-md">
                  <div className="w-16 h-16 bg-surface-hover rounded-md flex-shrink-0"></div>
                  <div>
                    <h4 className="text-body font-medium text-text-primary">Similar Title {i}</h4>
                    <p className="text-tiny text-text-secondary">Action, Adventure</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ContentCard
