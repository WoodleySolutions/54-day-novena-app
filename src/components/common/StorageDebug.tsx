import React, { useState, useEffect } from 'react';
import { getStorageInfo, clearNovenaData } from '../../utils/localStorage';

interface StorageDebugProps {
  isVisible?: boolean;
}

export const StorageDebug: React.FC<StorageDebugProps> = ({ isVisible = false }) => {
  const [storageInfo, setStorageInfo] = useState(getStorageInfo());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStorageInfo(getStorageInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const handleClearStorage = () => {
    if (window.confirm('Clear all saved progress? This cannot be undone.')) {
      clearNovenaData();
      setStorageInfo(getStorageInfo());
      window.location.reload(); // Reload to reset state
    }
  };

  const getStoredData = () => {
    try {
      const data = localStorage.getItem('novena-tracker-data');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm">Storage Debug</h4>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs bg-gray-600 px-2 py-1 rounded"
        >
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </div>
      
      <div className="text-xs space-y-1">
        <div>Has Data: {storageInfo.hasData ? '✅' : '❌'}</div>
        <div>Size: {storageInfo.dataSize} bytes</div>
        
        {showDetails && (
          <>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <strong>Raw Data:</strong>
              <pre className="bg-gray-900 p-2 rounded mt-1 text-xs overflow-auto max-h-32">
                {JSON.stringify(getStoredData(), null, 2)}
              </pre>
            </div>
            <button
              onClick={handleClearStorage}
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs mt-2 w-full"
            >
              Clear Storage
            </button>
          </>
        )}
      </div>
    </div>
  );
};