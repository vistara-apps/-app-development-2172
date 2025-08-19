import { useState, useEffect } from "react";
import { Plus, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AlertBanner } from "../components/ui/AlertBanner";
import { SubscriptionCard } from "../components/dashboard/SubscriptionCard";
import { CostChart } from "../components/dashboard/CostChart";
import { AddSubscriptionModal } from "../components/subscriptions/AddSubscriptionModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { differenceInDays } from "date-fns";

export function Dashboard() {
  const [subscriptions, setSubscriptions] = useLocalStorage('subscriptions', []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  const upcomingRenewals = subscriptions.filter(sub => {
    const daysUntilRenewal = differenceInDays(new Date(sub.renewalDate), new Date());
    return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
  });

  const totalMonthlyCost = subscriptions.reduce((total, sub) => {
    const cost = parseFloat(sub.cost);
    return total + (sub.billingCycle === 'year' ? cost / 12 : cost);
  }, 0);

  const totalYearlyCost = totalMonthlyCost * 12;

  const handleAddSubscription = (formData) => {
    if (editingSubscription) {
      setSubscriptions(prev => prev.map(sub => 
        sub.id === editingSubscription.id 
          ? { ...sub, ...formData }
          : sub
      ));
      setEditingSubscription(null);
    } else {
      const newSubscription = {
        id: Date.now(),
        ...formData
      };
      setSubscriptions(prev => [...prev, newSubscription]);
    }
    setShowAddModal(false);
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setShowAddModal(true);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-display">Dashboard</h1>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center">
          <Plus size={20} className="mr-2" />
          Add Subscription
        </Button>
      </div>

      {upcomingRenewals.length > 0 && (
        <AlertBanner
          message={`${upcomingRenewals.length} subscription${upcomingRenewals.length > 1 ? 's' : ''} renewing soon!`}
          type="warning"
        />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-caption">Active Subscriptions</p>
              <p className="text-heading1">{subscriptions.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg">
              <DollarSign className="text-accent" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-caption">Monthly Cost</p>
              <p className="text-heading1">${totalMonthlyCost.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg">
              <Calendar className="text-yellow-400" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-caption">Yearly Cost</p>
              <p className="text-heading1">${totalYearlyCost.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscriptions List */}
        <div className="lg:col-span-2">
          <h2 className="text-heading1 mb-4">Your Subscriptions</h2>
          {subscriptions.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-text-secondary mb-4">No subscriptions added yet</p>
              <Button onClick={() => setShowAddModal(true)}>
                Add Your First Subscription
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map(subscription => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onEdit={handleEditSubscription}
                  onDelete={handleDeleteSubscription}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cost Breakdown */}
        <div>
          <h2 className="text-heading1 mb-4">Cost Breakdown</h2>
          <Card>
            {subscriptions.length > 0 ? (
              <CostChart subscriptions={subscriptions} />
            ) : (
              <div className="text-center py-8">
                <p className="text-text-secondary">Add subscriptions to see cost breakdown</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <AddSubscriptionModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingSubscription(null);
        }}
        onSubmit={handleAddSubscription}
        editingSubscription={editingSubscription}
      />
    </div>
  );
}