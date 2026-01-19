'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Address } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, X, Check } from 'lucide-react';

interface AddressFormProps {
  addresses: Address[];
  selectedAddress: number | null;
  onSelectAddress: (id: number) => void;
  onAddAddress: (address: Omit<Address, 'id'>) => void;
}

export default function AddressForm({
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress,
}: AddressFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ addressName: '', deliveryAddress: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.addressName && formData.deliveryAddress) {
      onAddAddress(formData);
      setFormData({ addressName: '', deliveryAddress: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Address
          </Button>
        )}
      </div>

      {/* Add Address Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">New Address</h4>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setFormData({ addressName: '', deliveryAddress: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <Input
              placeholder="Address Name"
              value={formData.addressName}
              onChange={(e) => setFormData({ ...formData, addressName: e.target.value })}
              required
            />
            <textarea
              placeholder="Delivery Address"
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              required
            />
            <Button type="submit" className="w-full">
              Add Address
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Address List */}
      <div className="space-y-3">
        {addresses.map((address) => (
          <motion.button
            key={address.id}
            onClick={() => onSelectAddress(address.id)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              selectedAddress === address.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{address.addressName}</h4>
                <p className="text-sm text-gray-600">{address.deliveryAddress}</p>
              </div>
              {selectedAddress === address.id && (
                <Check className="text-indigo-600 flex-shrink-0 ml-2" size={24} />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
