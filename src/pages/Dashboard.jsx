import React from 'react'
import { format, differenceInDays } from 'date-fns'
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  CreditCard,
  Clock,
  AlertTriangle
} from 'lucide-react'
import Card from '../components/Card'
import AlertBanner from '../components/AlertBanner'
import { useApp } from '../context/AppContext'

function Dashboard() {
  const { 
    subscriptions, 
    getUpcomingRenewals, 
    getTotalMonthlyCost, 
    getTotalYearlyCost 
  } = useApp()

  const upcomingRenewals = getUpcomingRenewals()
  const monthlyCost = getTotalMonthlyCost()
  const yearlyCost = getTotalYearlyCost()

  const stats = [
    {
      label: 'Active Subscriptions',
      value: subscriptions.length,
      icon: CreditCard,
      color: 'text-accent'
    },
    {
      label: 'Monthly Spending',
      value: `$${monthlyCost.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      label: 'Yearly Projection',
      value: `$${yearlyCost.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      label: 'Upcoming Renewals',
      value: upcomingRenewals.length,
      icon: Calendar,
      color: 'text-yellow-500'
    }
  ]

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-display text-text-primary mb-2">Dashboard</h1>
        <p className="text-body text-text-secondary">
          Overview of your entertainment subscriptions and spending
        </p>
      </div>

      {/* Alerts */}
      {upcomingRenewals.length > 0 && (
        <AlertBanner variant="upcoming">
          <div>
            <h3 className="font-medium mb-1">Upcoming Renewals</h3>
            <p>You have {upcomingRenewals.length} subscription{upcomingRenewals.length !== 1 ? 's' : ''} renewing soon.</p>
          </div>
        </AlertBanner>
      )}

      {/* Critical renewals (within 3 days) */}
      {upcomingRenewals.some(sub => differenceInDays(sub.renewalDate, new Date()) <= 3) && (
        <AlertBanner variant="renewalWarning">
          <div>
            <h3 className="font-medium mb-1">Critical Renewal Alert</h3>
            <p>Some subscriptions are renewing within the next 3 days. Review your services to avoid unexpected charges.</p>
          </div>
        </AlertBanner>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-caption text-text-secondary">{stat.label}</p>
                    <p className="text-heading1 text-text-primary mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card.Content>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Renewals */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent" />
              <h2 className="text-heading2 text-text-primary">Upcoming Renewals</h2>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingRenewals.length > 0 ? (
              <div className="space-y-4">
                {upcomingRenewals.slice(0, 5).map((subscription) => {
                  const daysUntilRenewal = differenceInDays(subscription.renewalDate, new Date())
                  const isUrgent = daysUntilRenewal <= 3

                  return (
                    <div 
                      key={subscription.subscriptionId}
                      className={`flex items-center justify-between p-3 rounded-md ${
                        isUrgent ? 'bg-red-900 bg-opacity-20 border border-red-600' : 'bg-bg'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {isUrgent && <AlertTriangle className="h-4 w-4 text-red-400" />}
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
                        <p className="text-body text-accent font-medium">
                          ${subscription.cost}
                        </p>
                        <p className={`text-caption ${isUrgent ? 'text-red-400' : 'text-text-secondary'}`}>
                          {daysUntilRenewal === 0 ? 'Today' : 
                           daysUntilRenewal === 1 ? 'Tomorrow' : 
                           `${daysUntilRenewal} days`}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-body text-text-secondary text-center py-8">
                No upcoming renewals in the next 30 days
              </p>
            )}
          </Card.Content>
        </Card>

        {/* Spending Summary */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <h2 className="text-heading2 text-text-primary">Spending Summary</h2>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-caption text-text-secondary">Total Monthly Cost</p>
                <p className="text-display text-accent">${monthlyCost.toFixed(2)}</p>
              </div>
              
              <div className="space-y-3">
                {subscriptions.map((subscription) => {
                  const monthlyCost = subscription.billingCycle === 'monthly' 
                    ? subscription.cost 
                    : subscription.cost / 12

                  return (
                    <div key={subscription.subscriptionId} className="flex items-center justify-between">
                      <span className="text-body text-text-primary">{subscription.serviceName}</span>
                      <span className="text-body text-text-secondary">
                        ${monthlyCost.toFixed(2)}/mo
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-body text-text-secondary">Yearly Projection</span>
                  <span className="text-body text-accent font-medium">
                    ${yearlyCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard