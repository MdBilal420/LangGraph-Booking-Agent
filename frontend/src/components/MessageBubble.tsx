"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageBubbleProps } from "@/types/components";
import ToolCallIndicator from "./ToolCallIndicator";

export default function MessageBubble({
  message,
  isLatest = false,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-slide-up`}
    >
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center mr-2">
              <span className="text-white text-sm">🤖</span>
            </div>
            <span className="text-gray-800 text-xs">Travel Assistant</span>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`
            p-4 rounded-2xl shadow-lg
            ${
              isUser
                ? "glass-user rounded-br-md ml-4"
                : "glass-assistant rounded-bl-md mr-4"
            }
            ${isLatest ? "animate-fade-in" : ""}
          `}
        >
          {/* Message Content */}
          <div className="text-gray-900 leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom styling for markdown elements
                h1: ({ children }) => (
                  <h1 className="text-lg font-bold mb-2 text-gray-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold mb-2 text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-medium mb-1 text-gray-900">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 text-gray-900">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 text-gray-900">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 text-gray-900">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1 text-gray-900">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  ) : (
                    <code
                      className={`block bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto text-gray-800 ${className}`}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-2">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-2">
                    <table className="min-w-full border-collapse border border-gray-300">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-300 px-2 py-1 bg-gray-100 font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-300 px-2 py-1">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Tool Calls */}
          {message.tool_calls && message.tool_calls.length > 0 && (
            <ToolCallIndicator
              toolCalls={message.tool_calls}
              isVisible={true}
            />
          )}

          {/* Timestamp */}
          <div
            className={`mt-2 text-xs text-gray-700 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {timestamp}
          </div>
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="flex items-center justify-end mt-2">
            <span className="text-gray-600 text-xs mr-2">You</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
