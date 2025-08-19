import React from 'react'
import { format } from 'date-fns'
import { Edit2, Trash2, Calendar, DollarSign } from 'lucide-react'
import Card from './Card'
import Button from './Button'

function DataTable({ data, variant = 'subscriptionList', onEdit, onDelete }) {
  if (variant === 'subscriptionList') {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-heading2 text-text-primary">Your Subscriptions</h3>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider">
                    Next Renewal
                  </th>
                  <th className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {data.map((subscription) => (
                  <tr key={subscription.subscriptionId} className="hover:bg-bg">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-body text-text-primary font-medium">
                        {subscription.serviceName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-body text-text-secondary">
                        {subscription.planType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-accent mr-1" />
                        <span className="text-body text-text-primary">
                          ${subscription.cost}/{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-text-secondary mr-1" />
                        <span className="text-body text-text-secondary">
                          {format(subscription.renewalDate, 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onEdit?.(subscription)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete?.(subscription.subscriptionId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    )
  }

  if (variant === 'costBreakdown') {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-heading2 text-text-primary">Cost Breakdown</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.service} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                <span className="text-body text-text-primary">{item.service}</span>
                <span className="text-body text-accent font-medium">${item.cost}</span>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    )
  }

  return null
}

export default DataTable