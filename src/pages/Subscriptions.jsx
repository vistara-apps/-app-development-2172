import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../components/Button'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { useApp } from '../context/AppContext'

function SubscriptionForm({ subscription, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    serviceName: subscription?.serviceName || '',
    planType: subscription?.planType || '',
    cost: subscription?.cost || '',
    renewalDate: subscription?.renewalDate 
      ? subscription.renewalDate.toISOString().split('T')[0]
      : '',
    billingCycle: subscription?.billingCycle || 'monthly'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...subscription,
      ...formData,
      cost: parseFloat(formData.cost),
      renewalDate: new Date(formData.renewalDate)
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-caption text-text-secondary mb-1">
          Service Name
        </label>
        <Input
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          placeholder="Netflix, Disney+, etc."
          required
        />
      </div>

      <div>
        <label className="block text-caption text-text-secondary mb-1">
          Plan Type
        </label>
        <Input
          name="planType"
          value={formData.planType}
          onChange={handleChange}
          placeholder="Basic, Premium, etc."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-caption text-text-secondary mb-1">
            Cost
          </label>
          <Input
            name="cost"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={handleChange}
            placeholder="15.99"
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
            className="w-full px-3 py-2 bg-bg text-text-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-caption text-text-secondary mb-1">
          Next Renewal Date
        </label>
        <Input
          name="renewalDate"
          type="date"
          value={formData.renewalDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {subscription ? 'Update' : 'Add'} Subscription
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function Subscriptions() {
  const { 
    subscriptions, 
    addSubscription, 
    updateSubscription, 
    deleteSubscription 
  } = useApp()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState(null)

  const handleAddNew = () => {
    setEditingSubscription(null)
    setIsModalOpen(true)
  }

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription)
    setIsModalOpen(true)
  }

  const handleDelete = (subscriptionId) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      deleteSubscription(subscriptionId)
    }
  }

  const handleSubmit = (subscriptionData) => {
    if (editingSubscription) {
      updateSubscription(subscriptionData)
    } else {
      addSubscription(subscriptionData)
    }
    setIsModalOpen(false)
    setEditingSubscription(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingSubscription(null)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-text-primary mb-2">Subscriptions</h1>
          <p className="text-body text-text-secondary">
            Manage all your entertainment subscriptions in one place
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      <DataTable
        data={subscriptions}
        variant="subscriptionList"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
      >
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  )
}

export default Subscriptions