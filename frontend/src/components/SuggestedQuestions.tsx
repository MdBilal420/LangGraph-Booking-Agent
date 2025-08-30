'use client';

import React from 'react';
import { SuggestedQuestionsProps } from '@/types/components';

const SUGGESTED_QUESTIONS = [
  {
    text: "What time is my flight?",
    icon: "✈️",
    category: "Flight Info"
  },
  {
    text: "Can I change my flight to next week?",
    icon: "📅",
    category: "Flight Changes"
  },
  {
    text: "What hotels are available at my destination?",
    icon: "🏨",
    category: "Hotels"
  },
  {
    text: "What are my car rental options?",
    icon: "🚗",
    category: "Transportation"
  },
  {
    text: "What recommendations do you have for excursions?",
    icon: "🗺️",
    category: "Activities"
  },
  {
    text: "What about lodging and transportation?",
    icon: "🎒",
    category: "Travel Planning"
  }
];

export default function SuggestedQuestions({ onQuestionSelect, isVisible }: SuggestedQuestionsProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question.text)}
            className="glass-suggestion p-3 sm:p-4 rounded-xl text-left hover:scale-105 transform transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400/50 touch-manipulation"
            aria-label={`Ask: ${question.text}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                <span className="text-lg">{question.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs text-blue-700 font-medium mb-1 uppercase tracking-wide">
                  {question.category}
                </div>
                <div className="text-gray-800 text-sm leading-relaxed group-hover:text-black transition-colors">
                  {question.text}
                </div>
              </div>
            </div>

            {/* Hover indicator */}
            <div className="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-blue-700 text-xs">Click to ask →</span>
            </div>
          </button>
        ))}
      </div>

      {/* Additional help text */}
      <div className="mt-6 text-center">
        <p className="text-gray-700 text-sm">
          Or type your own question in the chat box below
        </p>
      </div>
    </div>
  );
}