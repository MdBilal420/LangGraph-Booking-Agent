'use client';

import React, { useState } from 'react';
import { ToolCallIndicatorProps } from '@/types/components';

export default function ToolCallIndicator({ toolCalls, isVisible }: ToolCallIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible || !toolCalls || toolCalls.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors text-sm"
      >
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        <span>Used {toolCalls.length} tool{toolCalls.length > 1 ? 's' : ''}</span>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2 animate-fade-in">
          {toolCalls.map((toolCall, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-3 text-sm">
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-gray-900 font-medium">{toolCall.name}</span>
              </div>

              {Object.keys(toolCall.args).length > 0 && (
                <div className="text-gray-700 text-xs mb-2">
                  <span className="font-medium">Parameters:</span>
                  <pre className="mt-1 bg-gray-50 rounded p-2 overflow-x-auto text-gray-800">
                    {JSON.stringify(toolCall.args, null, 2)}
                  </pre>
                </div>
              )}

              {toolCall.result !== null && toolCall.result !== undefined && (
                <div className="text-gray-700 text-xs">
                  <span className="font-medium">Result:</span>
                  <div className="mt-1 bg-gray-50 rounded p-2 text-gray-800">
                    {typeof toolCall.result === 'string'
                      ? String(toolCall.result)
                      : JSON.stringify(toolCall.result, null, 2)
                    }
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}