import React from 'react';

interface IntentionModalProps {
  isOpen: boolean;
  intention: string;
  onIntentionChange: (intention: string) => void;
  onClose: () => void;
}

export const IntentionModal: React.FC<IntentionModalProps> = ({
  isOpen,
  intention,
  onIntentionChange,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Set Your Intention</h3>
        <p className="text-gray-600 mb-4">
          What intention would you like to carry through your 54-day novena?
        </p>
        <textarea
          value={intention}
          onChange={(e) => onIntentionChange(e.target.value)}
          placeholder="Enter your prayer intention..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 resize-none"
          rows={3}
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
          >
            Begin Novena
          </button>
        </div>
      </div>
    </div>
  );
};