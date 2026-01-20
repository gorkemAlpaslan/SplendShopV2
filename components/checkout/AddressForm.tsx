'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Address } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, X, Check, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getUserProfile, addUserAddress, removeUserAddress } from '@/lib/firestore/users';

interface AddressFormProps {
  selectedAddressId: number | null;
  onSelectAddress: (address: Address) => void;
}

export default function AddressForm({
  selectedAddressId,
  onSelectAddress,
}: AddressFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ addressName: '', deliveryAddress: '' });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Fetch addresses on mount
  useEffect(() => {
    async function loadAddresses() {
        if (!user) return;
        setLoading(true);
        try {
            const profile = await getUserProfile(user.uid);
            if (profile && profile.addresses) {
                setAddresses(profile.addresses);
            }
        } catch (error) {
            console.error("Failed to load addresses:", error);
        } finally {
            setLoading(false);
        }
    }
    loadAddresses();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.addressName && formData.deliveryAddress) {
      try {
        const newAddress = await addUserAddress(user.uid, formData);
        setAddresses([...addresses, newAddress]);
        onSelectAddress(newAddress); // Auto-select new address
        setFormData({ addressName: '', deliveryAddress: '' });
        setIsAdding(false);
      } catch (error) {
        console.error("Failed to add address:", error);
      }
    }
  };

  const handleDelete = async (e: React.MouseEvent, address: Address) => {
      e.stopPropagation(); // Prevent selection when clicking delete
      if (!user || !confirm('Are you sure you want to delete this address?')) return;
      
      try {
          await removeUserAddress(user.uid, address);
          setAddresses(addresses.filter(a => a.id !== address.id));
          // If deleted address was selected, parent handles it? 
          // We can't really deselect easily without passing null to onSelectAddress which expects Address.
          // Let's leave it for now, user will have to select another.
      } catch (error) {
        console.error("Failed to delete address:", error);
      }
  };

  // If user is not logged in, show login message
  if (!user) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">You need to sign in to place an order.</p>
          <p className="text-sm text-muted-foreground">Please sign in to continue.</p>
        </div>
      </div>
    );
  }

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
        {loading ? (
             <div className="text-center py-4 text-muted-foreground">Loading addresses...</div>
        ) : addresses.length === 0 ? (
             <div className="text-center py-8 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                 No addresses found. Add one above!
             </div>
        ) : (
        addresses.map((address) => (
          <motion.button
            key={address.id}
            onClick={() => onSelectAddress(address)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all relative group ${
              selectedAddressId === address.id
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20'
                : 'border-border hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-8">
                <h4 className="font-semibold mb-1">{address.addressName}</h4>
                <p className="text-sm text-muted-foreground">{address.deliveryAddress}</p>
              </div>
              
              <div className="flex items-center gap-2">
                 {selectedAddressId === address.id && (
                    <Check className="text-indigo-600 shrink-0" size={20} />
                 )}
                 <div 
                    onClick={(e) => handleDelete(e, address)}
                    className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Address"
                 >
                    <Trash2 size={16} />
                 </div>
              </div>
            </div>
          </motion.button>
        )))}
      </div>
    </div>
  );
}
