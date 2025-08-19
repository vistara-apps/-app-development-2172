import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  DollarSign, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  Info,
  Check,
  X
} from 'lucide-react'
import Button from '../components/Button'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Card from '../components/Card'
import AlertBanner from '../components/AlertBanner'
import Tooltip from '../components/Tooltip'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/cn'

/**
 * Subscription form component for adding/editing subscriptions
 */
function SubscriptionForm({ subscription, onSubmit, onCancel, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    serviceName: subscription?.serviceName || '',
    planType: subscription?.planType || '',
    cost: subscription?.cost || '',
    renewalDate: subscription?.renewalDate 
      ? subscription.renewalDate.toISOString().split('T')[0]
      : '',
    billingCycle: subscription?.billingCycle || 'monthly'
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  
  // Popular streaming services for suggestions
  const popularServices = [
    'Netflix', 'Disney+', 'HBO Max', 'Hulu', 'Amazon Prime Video', 
    'Apple TV+', 'Paramount+', 'Peacock', 'YouTube Premium', 'Spotify',
    'Apple Music', 'Tidal', 'Xbox Game Pass', 'PlayStation Plus'
  ]
  
  // Popular plan types
  const popularPlans = {
    'Netflix': ['Basic', 'Standard', 'Premium'],
    'Disney+': ['Standard', 'Premium', 'Bundle'],
    'HBO Max': ['Ad-Free', 'With Ads'],
    'Hulu': ['Ad-Supported', 'No Ads', 'Live TV'],
    'Spotify': ['Individual', 'Duo', 'Family', 'Student']
  }
  
  // Get plan suggestions based on selected service
  const planSuggestions = popularPlans[formData.serviceName] || []
  
  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service name is required'
    }
    
    if (!formData.planType) {
      newErrors.planType = 'Plan type is required'
    }
    
    if (!formData.cost) {
      newErrors.cost = 'Cost is required'
    } else if (isNaN(parseFloat(formData.cost)) || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Cost must be a positive number'
    }
    
    if (!formData.renewalDate) {
      newErrors.renewalDate = 'Renewal date is required'
    } else {
      const date = new Date(formData.renewalDate)
      if (isNaN(date.getTime())) {
        newErrors.renewalDate = 'Invalid date format'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)
    
    if (validateForm()) {
      onSubmit({
        ...subscription,
        ...formData,
        cost: parseFloat(formData.cost),
        renewalDate: new Date(formData.renewalDate)
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true
    })
  }
  
  const handleBlur = (e) => {
    const { name } = e.target
    
    setTouched({
      ...touched,
      [name]: true
    })
    
    validateForm()
  }
  
  // Select a suggested service
  const selectService = (service) => {
    setFormData({
      ...formData,
      serviceName: service
    })
    
    setTouched({
      ...touched,
      serviceName: true
    })
  }
  
  // Select a suggested plan
  const selectPlan = (plan) => {
    setFormData({
      ...formData,
      planType: plan
    })
    
    setTouched({
      ...touched,
      planType: true
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Input
          label="Service Name"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Netflix, Disney+, etc."
          error={touched.serviceName ? errors.serviceName : undefined}
          hint="Enter the name of your streaming service"
          required
        />
        
        {/* Service suggestions */}
        {formData.serviceName && (
          <div className="mt-2 flex flex-wrap gap-2">
            {popularServices
              .filter(service => 
                service.toLowerCase().includes(formData.serviceName.toLowerCase()) && 
                service.toLowerCase() !== formData.serviceName.toLowerCase()
              )
              .slice(0, 5)
              .map(service => (
                <Button
                  key={service}
                  variant="ghost"
                  size="xs"
                  type="button"
                  onClick={() => selectService(service)}
                >
                  {service}
                </Button>
              ))
            }
          </div>
        )}
      </div>

      <div>
        <Input
          label="Plan Type"
          name="planType"
          value={formData.planType}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Basic, Premium, etc."
          error={touched.planType ? errors.planType : undefined}
          hint="Enter the type of subscription plan"
          required
        />
        
        {/* Plan suggestions */}
        {planSuggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {planSuggestions.map(plan => (
              <Button
                key={plan}
                variant="ghost"
                size="xs"
                type="button"
                onClick={() => selectPlan(plan)}
              >
                {plan}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Cost"
            name="cost"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="15.99"
            error={touched.cost ? errors.cost : undefined}
            leftIcon={<DollarSign className="h-4 w-4" />}
            required
          />
        </div>

        <div>
          <label className="block text-caption text-text-secondary mb-1">
            Billing Cycle
          </label>
          <select
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full px-3 py-2 bg-bg text-text-primary border rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-base",
              errors.billingCycle ? "border-danger" : "border-border-light"
            )}
            required
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {errors.billingCycle && touched.billingCycle && (
            <p className="mt-1 text-tiny text-danger">{errors.billingCycle}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          label="Next Renewal Date"
          name="renewalDate"
          type="date"
          value={formData.renewalDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.renewalDate ? errors.renewalDate : undefined}
          hint="When will this subscription renew next?"
          leftIcon={<Calendar className="h-4 w-4" />}
          required
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="flex-1"
          isLoading={isSubmitting}
        >
          {subscription ? 'Update' : 'Add'} Subscription
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

/**
 * Subscriptions page component
 */
function Subscriptions() {
  const { 
    subscriptions, 
    addSubscription, 
    updateSubscription, 
    deleteSubscription,
    getTotalMonthlyCost,
    getTotalYearlyCost
  } = useApp()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [successMessage])
  
  // Get cost data
  const monthlyCost = getTotalMonthlyCost()
  const yearlyCost = getTotalYearlyCost()

  const handleAddNew = () => {
    setEditingSubscription(null)
    setIsModalOpen(true)
  }

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription)
    setIsModalOpen(true)
  }

  const handleDeleteConfirm = (subscriptionId) => {
    const subscription = subscriptions.find(sub => sub.subscriptionId === subscriptionId)
    setDeleteConfirmation(subscription)
  }
  
  const handleDelete = () => {
    if (deleteConfirmation) {
      deleteSubscription(deleteConfirmation.subscriptionId)
      setSuccessMessage(`Successfully deleted ${deleteConfirmation.serviceName} subscription`)
      setDeleteConfirmation(null)
    }
  }

  const handleSubmit = (subscriptionData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingSubscription) {
        updateSubscription(subscriptionData)
        setSuccessMessage(`Successfully updated ${subscriptionData.serviceName} subscription`)
      } else {
        addSubscription(subscriptionData)
        setSuccessMessage(`Successfully added ${subscriptionData.serviceName} subscription`)
      }
      
      setIsModalOpen(false)
      setEditingSubscription(null)
      setIsSubmitting(false)
    }, 600)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingSubscription(null)
  }
  
  const handleDismissSuccess = () => {
    setSuccessMessage(null)
  }

  return (
    <div className="container py-6 md:py-8 space-y-6 md:space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading1 md:text-display text-text-primary mb-2">Subscriptions</h1>
          <p className="text-body text-text-secondary">
            Manage all your entertainment subscriptions in one place
          </p>
        </div>
      </div>
      
      {/* Success message */}
      {successMessage && (
        <AlertBanner 
          variant="success"
          title="Success"
          dismissible
          onDismiss={handleDismissSuccess}
        >
          <p>{successMessage}</p>
        </AlertBanner>
      )}
      
      {/* Subscription stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-text-secondary">Active Subscriptions</p>
                <p className="text-heading1 text-text-primary mt-1">{subscriptions.length}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary bg-opacity-15">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-text-secondary">Monthly Spending</p>
                <p className="text-heading1 text-text-primary mt-1">${monthlyCost.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent bg-opacity-15">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-text-secondary">Yearly Projection</p>
                <p className="text-heading1 text-text-primary mt-1">${yearlyCost.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary bg-opacity-15">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      <DataTable
        data={subscriptions}
        variant="subscriptionList"
        onEdit={handleEdit}
        onDelete={handleDeleteConfirm}
        onAdd={handleAddNew}
        isLoading={isLoading}
        title="Your Subscriptions"
      />

      {/* Add/Edit Subscription Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
      >
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        title="Confirm Deletion"
        size="sm"
      >
        {deleteConfirmation && (
          <div className="space-y-4">
            <AlertBanner variant="error">
              <p>Are you sure you want to delete the <strong>{deleteConfirmation.serviceName}</strong> subscription?</p>
            </AlertBanner>
            
            <div className="flex items-center justify-between bg-bg p-3 rounded-md">
              <div>
                <p className="text-body font-medium">{deleteConfirmation.serviceName}</p>
                <p className="text-caption text-text-secondary">{deleteConfirmation.planType}</p>
              </div>
              <p className="text-body text-accent font-medium">
                ${deleteConfirmation.cost.toFixed(2)}/{deleteConfirmation.billingCycle === 'monthly' ? 'mo' : 'yr'}
              </p>
            </div>
            
            <p className="text-body-small text-text-secondary">
              This action cannot be undone. The subscription will be permanently removed from your account.
            </p>
            
            <div className="flex space-x-3 pt-2">
              <Button 
                variant="ghost" 
                className="flex-1"
                onClick={() => setDeleteConfirmation(null)}
                leftIcon={<X className="h-4 w-4" />}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleDelete}
                leftIcon={<AlertTriangle className="h-4 w-4" />}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Subscriptions
