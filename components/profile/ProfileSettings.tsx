'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

export default function ProfileSettings() {
  const { user, logoutUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    surname: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    country: '',
    state: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile settings to localStorage
    localStorage.setItem('profileSettings', JSON.stringify(formData));
    alert('Profile settings saved!');
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = '/';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut size={18} />
          Log Out
        </Button>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.displayName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user?.displayName || 'User'}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Surname</label>
              <Input
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <Input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address Line 1</label>
            <Input
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              placeholder="Street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address Line 2</label>
            <Input
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Postcode</label>
            <Input
              value={formData.postcode}
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
              placeholder="12345"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State/Region</label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State or Region"
              />
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            Save Changes
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
