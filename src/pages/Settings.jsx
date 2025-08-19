import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function Settings() {
  const [subscriptions, setSubscriptions] = useLocalStorage('subscriptions', []);
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const [showExport, setShowExport] = useState(false);

  const handleExportData = () => {
    const data = {
      subscriptions,
      watchlist,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'streamsavvy-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.subscriptions) setSubscriptions(data.subscriptions);
          if (data.watchlist) setWatchlist(data.watchlist);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setSubscriptions([]);
      setWatchlist([]);
      alert('All data has been cleared.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account and data preferences</p>
      </div>

      {/* Account Information */}
      <Card>
        <h2 className="text-heading1 mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input 
              type="email" 
              value="user@example.com" 
              disabled 
              className="opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subscription Plan</label>
            <div className="flex items-center justify-between p-3 bg-bg rounded-md">
              <span className="text-text-primary">Free Plan</span>
              <Button variant="primary">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h2 className="text-heading1 mb-4">Data Management</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-bg rounded-md">
            <div>
              <h3 className="font-medium text-text-primary">Export Data</h3>
              <p className="text-sm text-text-secondary">Download all your subscriptions and watchlist data</p>
            </div>
            <Button variant="secondary" onClick={handleExportData}>
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-bg rounded-md">
            <div>
              <h3 className="font-medium text-text-primary">Import Data</h3>
              <p className="text-sm text-text-secondary">Upload previously exported data</p>
            </div>
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
                id="import-data"
              />
              <Button variant="secondary" onClick={() => document.getElementById('import-data').click()}>
                Import
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-bg rounded-md">
            <div>
              <h3 className="font-medium text-text-primary">Clear All Data</h3>
              <p className="text-sm text-text-secondary">Remove all subscriptions and watchlist items</p>
            </div>
            <Button variant="destructive" onClick={handleClearAllData}>
              Clear All
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-heading1 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text-primary">Renewal Alerts</h3>
              <p className="text-sm text-text-secondary">Get notified before subscriptions renew</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text-primary">New Content Recommendations</h3>
              <p className="text-sm text-text-secondary">Receive personalized content suggestions</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text-primary">Watchlist Updates</h3>
              <p className="text-sm text-text-secondary">Get notified when watchlist items become available</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Card>
        <h2 className="text-heading1 mb-4">Your Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-heading1 text-primary">{subscriptions.length}</p>
            <p className="text-text-secondary text-sm">Active Subscriptions</p>
          </div>
          <div className="text-center">
            <p className="text-heading1 text-accent">{watchlist.length}</p>
            <p className="text-text-secondary text-sm">Watchlist Items</p>
          </div>
          <div className="text-center">
            <p className="text-heading1 text-yellow-400">
              ${subscriptions.reduce((total, sub) => {
                const cost = parseFloat(sub.cost) || 0;
                return total + (sub.billingCycle === 'year' ? cost / 12 : cost);
              }, 0).toFixed(0)}
            </p>
            <p className="text-text-secondary text-sm">Monthly Spend</p>
          </div>
          <div className="text-center">
            <p className="text-heading1 text-purple-400">7</p>
            <p className="text-text-secondary text-sm">Days Using App</p>
          </div>
        </div>
      </Card>
    </div>
  );
}