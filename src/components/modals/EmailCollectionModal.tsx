import React, { useState } from 'react';
import { Mail, Shield, Bell, X } from 'lucide-react';

interface EmailCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    email: string;
    marketingConsent: boolean;
    prayerReminders: boolean;
    newsletter: boolean;
  }) => void;
}

export const EmailCollectionModal: React.FC<EmailCollectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [prayerReminders, setPrayerReminders] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        email,
        marketingConsent,
        prayerReminders,
        newsletter
      });
      onClose();
    } catch (error) {
      console.error('Email registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Stay Connected
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get prayer reminders and updates about your spiritual journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={prayerReminders}
                onChange={(e) => setPrayerReminders(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Prayer reminders and spiritual guidance
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Monthly newsletter with Catholic devotions
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                New features and app updates
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          Your email is secure and you can unsubscribe anytime
        </p>
      </div>
    </div>
  );
};