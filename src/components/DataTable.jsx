import React, { useState } from 'react'
import { format, differenceInDays } from 'date-fns'
import { 
  Edit2, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Search, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Filter,
  Plus,
  ArrowUpDown,
  Info
} from 'lucide-react'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import SkeletonLoader from './SkeletonLoader'
import Tooltip from './Tooltip'
import { cn } from '../utils/cn'

/**
 * DataTable component for displaying tabular data
 * 
 * @param {Array} data - The data to display in the table
 * @param {string} variant - The table variant (subscriptionList, costBreakdown)
 * @param {function} onEdit - Function to call when edit button is clicked
 * @param {function} onDelete - Function to call when delete button is clicked
 * @param {boolean} isLoading - Whether the table is in loading state
 * @param {function} onAdd - Function to call when add button is clicked
 * @param {string} title - Table title
 */
function DataTable({ 
  data = [], 
  variant = 'subscriptionList', 
  onEdit, 
  onDelete,
  isLoading = false,
  onAdd,
  title
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  // Filter and sort data
  const processData = (data) => {
    // Filter by search term
    let filteredData = data
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredData = data.filter(item => {
        if (variant === 'subscriptionList') {
          return (
            item.serviceName.toLowerCase().includes(term) ||
            item.planType.toLowerCase().includes(term)
          )
        }
        return true
      })
    }
    
    // Sort data
    if (sortField) {
      filteredData = [...filteredData].sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]
        
        // Handle special cases
        if (sortField === 'renewalDate') {
          aValue = new Date(aValue).getTime()
          bValue = new Date(bValue).getTime()
        }
        
        // Compare values
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }
    
    return filteredData
  }
  
  // Get processed data
  const processedData = isLoading ? [] : processData(data)
  
  // Render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1" />
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-3 w-3 ml-1" /> 
      : <ChevronDown className="h-3 w-3 ml-1" />
  }

  if (variant === 'subscriptionList') {
    return (
      <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-heading2 text-text-primary">{title || 'Your Subscriptions'}</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-auto"
                />
              </div>
              {onAdd && (
                <Button
                  variant="primary"
                  leftIcon={<Plus className="h-4 w-4" />}
                  onClick={onAdd}
                >
                  Add New
                </Button>
              )}
            </div>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-6 space-y-6">
                <SkeletonLoader.Group count={5} variant="rect" height={60} gap="gap-4" />
              </div>
            ) : processedData.length > 0 ? (
              <table className="w-full">
                <thead className="bg-bg">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('serviceName')}
                    >
                      <div className="flex items-center">
                        Service
                        {renderSortIndicator('serviceName')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('planType')}
                    >
                      <div className="flex items-center">
                        Plan
                        {renderSortIndicator('planType')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('cost')}
                    >
                      <div className="flex items-center">
                        Cost
                        {renderSortIndicator('cost')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('renewalDate')}
                    >
                      <div className="flex items-center">
                        Next Renewal
                        {renderSortIndicator('renewalDate')}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-caption text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {processedData.map((subscription) => {
                    const daysUntilRenewal = differenceInDays(subscription.renewalDate, new Date())
                    const isUrgent = daysUntilRenewal <= 3
                    
                    return (
                      <tr 
                        key={subscription.subscriptionId} 
                        className="hover:bg-surface-hover transition-colors"
                      >
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
                              ${subscription.cost.toFixed(2)}
                              <span className="text-text-secondary text-tiny">
                                /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {isUrgent && (
                              <Tooltip content="Renewing soon!">
                                <AlertTriangle className="h-4 w-4 text-danger mr-1.5" />
                              </Tooltip>
                            )}
                            <Calendar className="h-4 w-4 text-text-secondary mr-1.5" />
                            <span className={cn(
                              "text-body",
                              isUrgent ? "text-danger" : "text-text-secondary"
                            )}>
                              {format(subscription.renewalDate, 'MMM dd, yyyy')}
                              {isUrgent && (
                                <span className="ml-1.5 text-tiny">
                                  ({daysUntilRenewal === 0 ? 'Today' : 
                                    daysUntilRenewal === 1 ? 'Tomorrow' : 
                                    `${daysUntilRenewal} days`})
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit?.(subscription)}
                              aria-label={`Edit ${subscription.serviceName} subscription`}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-danger hover:bg-danger-muted"
                              onClick={() => onDelete?.(subscription.subscriptionId)}
                              aria-label={`Delete ${subscription.serviceName} subscription`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-heading2 text-text-primary mb-2">
                  {searchTerm ? 'No results found' : 'No subscriptions yet'}
                </h3>
                <p className="text-body text-text-secondary mb-6">
                  {searchTerm 
                    ? `No subscriptions match "${searchTerm}". Try a different search term.` 
                    : 'Add your first subscription to get started.'}
                </p>
                {onAdd && !searchTerm && (
                  <Button
                    variant="primary"
                    leftIcon={<Plus className="h-4 w-4" />}
                    onClick={onAdd}
                  >
                    Add Subscription
                  </Button>
                )}
                {searchTerm && (
                  <Button
                    variant="secondary"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    )
  }

  if (variant === 'costBreakdown') {
    return (
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h3 className="text-heading2 text-text-primary">{title || 'Cost Breakdown'}</h3>
            {onAdd && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Filter className="h-4 w-4" />}
              >
                Filter
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <SkeletonLoader.Group count={5} variant="text" gap="gap-4" />
          ) : processedData.length > 0 ? (
            <div className="space-y-3">
              {processedData.map((item, index) => (
                <div 
                  key={item.service || index} 
                  className="flex items-center justify-between py-2.5 border-b border-border-dark last:border-0"
                >
                  <span className="text-body text-text-primary">{item.service}</span>
                  <span className="text-body text-accent font-medium">${typeof item.cost === 'number' ? item.cost.toFixed(2) : item.cost}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Info className="h-12 w-12 text-text-secondary mx-auto mb-3" />
              <p className="text-body text-text-primary font-medium mb-1">
                No data available
              </p>
              <p className="text-body-small text-text-secondary">
                There is no cost data to display at this time.
              </p>
            </div>
          )}
        </Card.Content>
      </Card>
    )
  }

  return null
}

export default DataTable
