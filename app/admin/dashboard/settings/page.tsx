'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Bell, User, Phone } from 'lucide-react';

export default function SettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState('+233248993067');
  const [storeName, setStoreName] = useState('Elegance Fashion');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('whatsappNumber', whatsappNumber);
    localStorage.setItem('storeName', storeName);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage store configuration</p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store Information */}
        <div className="bg-white rounded-lg shadow-elegant p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="bg-primary/10 p-3 rounded-lg">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Store Information</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Settings */}
        <div className="bg-white rounded-lg shadow-elegant p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="bg-green-100 p-3 rounded-lg">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">WhatsApp Number</h2>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              WhatsApp Business Number
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+233248993067"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground">
              Include country code (e.g., +233 for Ghana)
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-elegant p-6 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Bell className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Get email alerts for new orders</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <div>
              <p className="text-sm font-medium text-foreground">WhatsApp Notifications</p>
              <p className="text-xs text-muted-foreground">Get WhatsApp alerts for new orders</p>
            </div>
          </label>
        </div>
      </div>

      {/* Save Section */}
      <div className="bg-white rounded-lg shadow-elegant p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Save Changes</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All changes are automatically saved to your browser
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <p className="text-sm text-green-600 font-medium">Settings saved!</p>
            )}
            <button onClick={handleSave} className="btn-primary">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
