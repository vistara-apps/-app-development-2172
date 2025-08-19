import React, { useState, useEffect } from 'react'
import { format, differenceInDays, parseISO } from 'date-fns'
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  CreditCard,
  Clock,
  AlertTriangle,
  ArrowRight,
  PieChart,
  BarChart,
  Info,
  Plus,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import AlertBanner from '../components/AlertBanner'
import SkeletonLoader from '../components/SkeletonLoader'
import Tooltip from '../components/Tooltip'
import Collapsible from '../components/Collapsible'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/cn'

/**
 * Dashboard page component
 */
function Dashboard() {
  const { 
    subscriptions, 
    getUpcomingRenewals, 
    getTotalMonthlyCost, 
    getTotalYearlyCost,
    user
  } = useApp()

  const [isLoading, setIsLoading] = useState(true)
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false)
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const upcomingRenewals = getUpcomingRenewals()
  const monthlyCost = getTotalMonthlyCost()
  const yearlyCost = getTotalYearlyCost()
  
  // Calculate monthly budget (for demo purposes)
  const monthlyBudget = 50
  const budgetPercentage = Math.min((monthlyCost / monthlyBudget) * 100, 100)
  const isOverBudget = monthlyCost > monthlyBudget
  
  // Sort subscriptions by cost (highest first)
  const sortedSubscriptions = [...subscriptions].sort((a, b) => b.cost - a.cost)
  
  // Calculate subscription distribution by service type (for demo purposes)
  const serviceTypes = {
    'Video': ['Netflix', 'Disney+', 'HBO Max'],
    'Music': ['Spotify', 'Apple Music'],
    'Gaming': ['Xbox Game Pass', 'PlayStation Plus'],
    'Other': []
  }
  
  const subscriptionsByType = subscriptions.reduce((acc, sub) => {
    let type = 'Other'
    
    for (const [category, services] of Object.entries(serviceTypes)) {
      if (services.includes(sub.serviceName)) {
        type = category
        break
      }
    }
    
    if (!acc[type]) acc[type] = { count: 0, cost: 0 }
    
    acc[type].count += 1
    acc[type].cost += sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12
    
    return acc
  }, {})

  const stats = [
    {
      label: 'Active Subscriptions',
      value: subscriptions.length,
      icon: CreditCard,
      color: 'text-accent',
      tooltip: 'Total number of active subscription services',
      link: '/subscriptions'
    },
    {
      label: 'Monthly Spending',
      value: `$${monthlyCost.toFixed(2)}`,
      icon: DollarSign,
      color: isOverBudget ? 'text-danger' : 'text-accent',
      tooltip: `${isOverBudget ? 'Over budget! ' : ''}Your total monthly subscription costs`,
      link: '/subscriptions'
    },
    {
      label: 'Yearly Projection',
      value: `$${yearlyCost.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-primary',
      tooltip: 'Projected annual cost of all your subscriptions',
      link: '/subscriptions'
    },
    {
      label: 'Upcoming Renewals',
      value: upcomingRenewals.length,
      icon: Calendar,
      color: upcomingRenewals.length > 0 ? 'text-warning' : 'text-accent',
      tooltip: upcomingRenewals.length > 0 
        ? `You have ${upcomingRenewals.length} subscription${upcomingRenewals.length !== 1 ? 's' : ''} renewing soon` 
        : 'No upcoming renewals in the next 30 days',
      link: '#upcoming-renewals'
    }
  ]

  return (
    <div className="container py-6 md:py-8 space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-heading1 md:text-display text-text-primary mb-2">Dashboard</h1>
        <p className="text-body text-text-secondary">
          Overview of your entertainment subscriptions and spending
        </p>
      </div>

      {/* Alerts */}
      {!isLoading && upcomingRenewals.length > 0 && (
        <AlertBanner 
          variant="upcoming"
          title="Upcoming Renewals"
          dismissible
        >
          <p>You have {upcomingRenewals.length} subscription{upcomingRenewals.length !== 1 ? 's' : ''} renewing soon.</p>
        </AlertBanner>
      )}

      {/* Critical renewals (within 3 days) */}
      {!isLoading && upcomingRenewals.some(sub => differenceInDays(sub.renewalDate, new Date()) <= 3) && (
        <AlertBanner 
          variant="renewalWarning"
          title="Critical Renewal Alert"
          dismissible
        >
          <p>Some subscriptions are renewing within the next 3 days. Review your services to avoid unexpected charges.</p>
        </AlertBanner>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          // Skeleton loaders for stats
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <SkeletonLoader variant="text" width={100} />
                    <SkeletonLoader variant="heading" width={80} />
                  </div>
                  <SkeletonLoader variant="circle" width={40} height={40} />
                </div>
              </Card.Content>
            </Card>
          ))
        ) : (
          // Actual stats
          stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card 
                key={stat.label} 
                hover
                interactive={!!stat.link}
                onClick={() => stat.link && window.location.href = stat.link}
                className="transition-all duration-200"
              >
                <Card.Content>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <p className="text-caption text-text-secondary">{stat.label}</p>
                        <Tooltip content={stat.tooltip}>
                          <Info className="h-3.5 w-3.5 text-text-secondary ml-1.5 cursor-help" />
                        </Tooltip>
                      </div>
                      <p className="text-heading1 text-text-primary mt-1">{stat.value}</p>
                    </div>
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full bg-opacity-15",
                      stat.color === 'text-accent' ? 'bg-accent' : 
                      stat.color === 'text-primary' ? 'bg-primary' : 
                      stat.color === 'text-warning' ? 'bg-warning' : 
                      stat.color === 'text-danger' ? 'bg-danger' : 'bg-accent'
                    )}>
                      <Icon className={cn('h-6 w-6', stat.color)} />
                    </div>
                  </div>
                  
                  {stat.link && (
                    <div className="mt-3 text-right">
                      <Link 
                        to={stat.link} 
                        className="text-tiny text-primary flex items-center justify-end hover:text-accent transition-colors"
                      >
                        View details
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  )}
                </Card.Content>
              </Card>
            )
          })
        )}
      </div>

      {/* Budget Progress */}
      {!isLoading && (
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-accent" />
                <h2 className="text-heading2 text-text-primary">Monthly Budget</h2>
              </div>
              <Tooltip content="Set your monthly budget in Settings">
                <Button 
                  variant="ghost" 
                  size="sm"
                  leftIcon={<Info className="h-4 w-4" />}
                >
                  Set Budget
                </Button>
              </Tooltip>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-body text-text-primary">
                  ${monthlyCost.toFixed(2)} / ${monthlyBudget.toFixed(2)}
                </span>
                <span className={cn(
                  "text-body font-medium",
                  isOverBudget ? "text-danger" : "text-success"
                )}>
                  {isOverBudget ? 'Over budget' : 'Under budget'}
                </span>
              </div>
              
              <div className="h-4 bg-bg rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isOverBudget ? "bg-danger" : "bg-success"
                  )}
                  style={{ width: `${budgetPercentage}%` }}
                />
              </div>
              
              {isOverBudget && (
                <p className="text-body-small text-danger">
                  You're ${(monthlyCost - monthlyBudget).toFixed(2)} over your monthly budget.
                </p>
              )}
            </div>
          </Card.Content>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Upcoming Renewals */}
        <Card id="upcoming-renewals">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-accent" />
                <h2 className="text-heading2 text-text-primary">Upcoming Renewals</h2>
              </div>
              <Link to="/subscriptions">
                <Button 
                  variant="ghost" 
                  size="sm"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  View All
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <SkeletonLoader.Group count={3} variant="rect" height={70} gap="gap-3" />
            ) : upcomingRenewals.length > 0 ? (
              <div className="space-y-3">
                {upcomingRenewals.slice(0, 5).map((subscription) => {
                  const daysUntilRenewal = differenceInDays(subscription.renewalDate, new Date())
                  const isUrgent = daysUntilRenewal <= 3

                  return (
                    <div 
                      key={subscription.subscriptionId}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md transition-all",
                        isUrgent 
                          ? 'bg-danger-muted border border-danger' 
                          : 'bg-bg hover:bg-surface-hover'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        {isUrgent && <AlertTriangle className="h-4 w-4 text-danger flex-shrink-0" />}
                        <div>
                          <p className="text-body text-text-primary font-medium">
                            {subscription.serviceName}
                          </p>
                          <p className="text-caption text-text-secondary">
                            {format(subscription.renewalDate, 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <p className="text-body text-accent font-medium mr-1">
                            ${subscription.cost.toFixed(2)}
                          </p>
                          <span className="text-tiny text-text-secondary">
                            /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        </div>
                        <p className={cn(
                          "text-caption",
                          isUrgent ? "text-danger" : "text-text-secondary"
                        )}>
                          {daysUntilRenewal === 0 ? 'Today' : 
                           daysUntilRenewal === 1 ? 'Tomorrow' : 
                           `${daysUntilRenewal} days`}
                        </p>
                      </div>
                    </div>
                  )
                })}
                
                {upcomingRenewals.length > 5 && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2"
                    onClick={() => {}}
                  >
                    Show {upcomingRenewals.length - 5} more
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-text-secondary mx-auto mb-3" />
                <p className="text-body text-text-primary font-medium mb-1">
                  No upcoming renewals
                </p>
                <p className="text-body-small text-text-secondary mb-4">
                  You don't have any subscriptions renewing in the next 30 days
                </p>
                <Link to="/subscriptions">
                  <Button 
                    variant="outline"
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Subscription
                  </Button>
                </Link>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Spending Summary */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart className="h-5 w-5 text-accent" />
                <h2 className="text-heading2 text-text-primary">Spending Summary</h2>
              </div>
              <Tooltip content="View detailed spending analytics">
                <Button 
                  variant="ghost" 
                  size="sm"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                >
                  Analytics
                </Button>
              </Tooltip>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-6">
                <div className="text-center">
                  <SkeletonLoader variant="text" width={120} className="mx-auto mb-2" />
                  <SkeletonLoader variant="heading" width={150} height={40} className="mx-auto" />
                </div>
                
                <SkeletonLoader.Group count={4} variant="text" gap="gap-3" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-caption text-text-secondary">Total Monthly Cost</p>
                  <p className="text-display text-accent">${monthlyCost.toFixed(2)}</p>
                </div>
                
                <Collapsible 
                  title="Subscription Breakdown"
                  defaultOpen={true}
                >
                  <div className="space-y-3 mt-2">
                    {showAllSubscriptions 
                      ? sortedSubscriptions.map((subscription) => {
                          const monthlyCost = subscription.billingCycle === 'monthly' 
                            ? subscription.cost 
                            : subscription.cost / 12

                          return (
                            <div key={subscription.subscriptionId} className="flex items-center justify-between py-1.5">
                              <div className="flex items-center">
                                <span className="text-body text-text-primary">{subscription.serviceName}</span>
                                {subscription.billingCycle === 'yearly' && (
                                  <Tooltip content="Yearly subscription (cost shown as monthly equivalent)">
                                    <Calendar className="h-3.5 w-3.5 text-text-secondary ml-1.5" />
                                  </Tooltip>
                                )}
                              </div>
                              <span className="text-body text-text-secondary">
                                ${monthlyCost.toFixed(2)}/mo
                              </span>
                            </div>
                          )
                        })
                      : sortedSubscriptions.slice(0, 5).map((subscription) => {
                          const monthlyCost = subscription.billingCycle === 'monthly' 
                            ? subscription.cost 
                            : subscription.cost / 12

                          return (
                            <div key={subscription.subscriptionId} className="flex items-center justify-between py-1.5">
                              <div className="flex items-center">
                                <span className="text-body text-text-primary">{subscription.serviceName}</span>
                                {subscription.billingCycle === 'yearly' && (
                                  <Tooltip content="Yearly subscription (cost shown as monthly equivalent)">
                                    <Calendar className="h-3.5 w-3.5 text-text-secondary ml-1.5" />
                                  </Tooltip>
                                )}
                              </div>
                              <span className="text-body text-text-secondary">
                                ${monthlyCost.toFixed(2)}/mo
                              </span>
                            </div>
                          )
                        })
                    }
                    
                    {sortedSubscriptions.length > 5 && !showAllSubscriptions && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full mt-1"
                        onClick={() => setShowAllSubscriptions(true)}
                      >
                        Show {sortedSubscriptions.length - 5} more
                      </Button>
                    )}
                    
                    {showAllSubscriptions && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full mt-1"
                        onClick={() => setShowAllSubscriptions(false)}
                      >
                        Show less
                      </Button>
                    )}
                  </div>
                </Collapsible>

                <div className="pt-4 border-t border-border-dark">
                  <div className="flex items-center justify-between">
                    <span className="text-body text-text-secondary">Yearly Projection</span>
                    <span className="text-body text-accent font-medium">
                      ${yearlyCost.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {user.subscriptionTier === 'premium' && (
                  <div className="pt-4 border-t border-border-dark">
                    <h3 className="text-heading3 text-text-primary mb-3 flex items-center">
                      <PieChart className="h-4 w-4 text-accent mr-2" />
                      Subscription Distribution
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(subscriptionsByType).map(([type, data]) => (
                        <div key={type} className="flex items-center">
                          <div className="w-24 text-body-small text-text-secondary">{type}</div>
                          <div className="flex-1 mx-3">
                            <div className="h-2 bg-bg rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full",
                                  type === 'Video' ? "bg-primary" :
                                  type === 'Music' ? "bg-accent" :
                                  type === 'Gaming' ? "bg-warning" : "bg-text-secondary"
                                )}
                                style={{ width: `${(data.cost / monthlyCost) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="w-20 text-right text-body-small text-text-primary">
                            ${data.cost.toFixed(2)}/mo
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
