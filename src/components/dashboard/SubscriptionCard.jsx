import { Calendar, DollarSign, AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { format, differenceInDays } from "date-fns";

export function SubscriptionCard({ subscription, onEdit, onDelete }) {
  const renewalDate = new Date(subscription.renewalDate);
  const daysUntilRenewal = differenceInDays(renewalDate, new Date());
  const isExpiringSoon = daysUntilRenewal <= 7;

  return (
    <Card className="relative">
      {isExpiringSoon && (
        <div className="absolute top-4 right-4">
          <AlertTriangle className="text-yellow-400" size={20} />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-heading2 mb-1">{subscription.serviceName}</h3>
          <p className="text-text-secondary text-caption">{subscription.planType}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-text-secondary">
          <DollarSign size={16} className="mr-2" />
          <span>${subscription.cost}/{subscription.billingCycle}</span>
        </div>
        
        <div className="flex items-center text-text-secondary">
          <Calendar size={16} className="mr-2" />
          <span>Renews {format(renewalDate, 'MMM dd, yyyy')}</span>
          {isExpiringSoon && (
            <span className="ml-2 text-yellow-400 text-caption">
              ({daysUntilRenewal} days)
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="secondary" onClick={() => onEdit(subscription)} className="flex-1">
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(subscription.id)} className="flex-1">
          Cancel
        </Button>
      </div>
    </Card>
  );
}