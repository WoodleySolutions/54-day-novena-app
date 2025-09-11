import React from 'react';
import { X, Heart, Calendar, Star, BookOpen } from 'lucide-react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">About the 54-Day Novena</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* What is it */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">What is the 54-Day Novena?</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The 54-Day Novena is a powerful Catholic devotion consisting of six complete novenas (9-day prayer cycles) 
              to the Blessed Virgin Mary. It is divided into two phases: 27 days of petition (asking for a favor) 
              followed by 27 days of thanksgiving (whether or not the request was granted as expected).
            </p>
          </section>

          {/* How it works */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">How It Works</h3>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Days 1-27 (Petition Phase):</strong> Pray with the intention of requesting a specific favor or grace from God through Mary's intercession.</p>
              <p><strong>Days 28-54 (Thanksgiving Phase):</strong> Pray in thanksgiving, trusting that God knows what is best for you, regardless of the outcome.</p>
              <p>Each day includes praying the rosary with specific mysteries that rotate every three days: Joyful, Sorrowful, and Glorious mysteries.</p>
            </div>
          </section>

          {/* Historical Context */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Historical Background</h3>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                This devotion was revealed by the Blessed Virgin Mary to Fortuna Agrelli in Naples, Italy, around 1884. 
                Mary promised that this novena would be especially powerful for obtaining graces and favors.
              </p>
              <p>
                The structure reflects the biblical significance of the number 9 (representing completeness) and 6 
                (representing imperfection seeking perfection), totaling 54 days of dedicated prayer and surrender to God's will.
              </p>
              <p>
                The devotion emphasizes both petition and thanksgiving, teaching us to trust in God's providence 
                whether our prayers are answered as we hope or in unexpected ways.
              </p>
            </div>
          </section>

          {/* The Promise */}
          <section className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-4 rounded-r">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Mary's Promise</h3>
            <p className="text-blue-700 dark:text-blue-300 italic">
              "Whoever desires to obtain favors from me should make three novenas of the prayers of the Rosary 
              in petition and three novenas in thanksgiving, whether or not the request has been granted."
            </p>
          </section>

          {/* Spiritual Benefits */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Spiritual Benefits</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Deepens your relationship with Mary and Jesus through daily prayer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Teaches patience, perseverance, and trust in God's timing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Cultivates gratitude regardless of outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Provides a structured path for sustained prayer and meditation</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-600 p-6">
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};