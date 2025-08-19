import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const popularServices = [
  "Netflix", "Disney+", "Amazon Prime Video", "Hulu", "HBO Max", 
  "Apple TV+", "Paramount+", "Peacock", "Spotify", "Apple Music",
  "YouTube Premium", "Twitch Turbo"
];

export function AddSubscriptionModal({ isOpen, onClose, onSubmit, editingSubscription }) {
  const [formData, setFormData] = useState({
    serviceName: editingSubscription?.serviceName || "",
    planType: editingSubscription?.planType || "",
    cost: editingSubscription?.cost || "",
    renewalDate: editingSubscription?.renewalDate || "",
    billingCycle: editingSubscription?.billingCycle || "month"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      serviceName: "",
      planType: "",
      cost: "",
      renewalDate: "",
      billingCycle: "month"
    });
  };

  const handleServiceSelect = (service) => {
    setFormData(prev => ({ ...prev, serviceName: service }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={editingSubscription ? "Edit Subscription" : "Add New Subscription"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Service Name</label>
          <Input
            type="text"
            value={formData.serviceName}
            onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
            placeholder="e.g., Netflix"
            required
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {popularServices.map(service => (
              <button
                key={service}
                type="button"
                onClick={() => handleServiceSelect(service)}
                className="px-2 py-1 text-xs bg-bg hover:bg-primary/20 rounded text-text-secondary hover:text-text-primary transition-colors"
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Plan Type</label>
          <Input
            type="text"
            value={formData.planType}
            onChange={(e) => setFormData(prev => ({ ...prev, planType: e.target.value }))}
            placeholder="e.g., Premium, Family, Basic"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cost</label>
            <Input
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Billing Cycle</label>
            <select
              value={formData.billingCycle}
              onChange={(e) => setFormData(prev => ({ ...prev, billingCycle: e.target.value }))}
              className="w-full px-3 py-2 bg-bg border border-text-secondary/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Next Renewal Date</label>
          <Input
            type="date"
            value={formData.renewalDate}
            onChange={(e) => setFormData(prev => ({ ...prev, renewalDate: e.target.value }))}
            required
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {editingSubscription ? "Update" : "Add"} Subscription
          </Button>
        </div>
      </form>
    </Modal>
  );
}