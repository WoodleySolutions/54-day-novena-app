import React from 'react';
import { X, BookOpen, Heart, Lightbulb, Clock } from 'lucide-react';
import { PrayerInfo } from '../../constants/prayerInfo';

interface PrayerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prayerInfo: PrayerInfo;
}

export const PrayerInfoModal: React.FC<PrayerInfoModalProps> = ({
  isOpen,
  onClose,
  prayerInfo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{prayerInfo.title}</h2>
            <p className="text-blue-100">
              Learn about this sacred Catholic devotion
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Origin Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Origin</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {prayerInfo.origin}
            </p>
          </div>

          {/* Meaning Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Meaning</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {prayerInfo.meaning}
            </p>
          </div>

          {/* Context Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Context</h3>
            </div>
            <ul className="space-y-2">
              {prayerInfo.context.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Spiritual Benefits Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Spiritual Benefits</h3>
            </div>
            <ul className="space-y-2">
              {prayerInfo.spiritualBenefits.map((benefit, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Historical Background Section */}
          {prayerInfo.historicalBackground && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Historical Background</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {prayerInfo.historicalBackground}
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
            <p className="text-blue-800 dark:text-blue-200 text-center text-sm leading-relaxed">
              <strong>Begin your journey:</strong> Start this beautiful devotion today and experience the graces that flow from faithful, consistent prayer.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-600 p-6 transition-colors duration-300">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Begin Prayer
          </button>
        </div>

      </div>
    </div>
  );
};