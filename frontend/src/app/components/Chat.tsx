"use client"

import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [threadId, setThreadId] = useState<string | null>(null)
  const [passengerId, setPassengerId] = useState<string>('') // Initialize as empty string
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://langgraph-booking-agent.onrender.com'

  const suggestedQuestions = [
    'Hi there, what time is my flight?',
    'Am I allowed to update my flight to something sooner?',
    'What about lodging and transportation?',
    'I\'d like an affordable hotel for my week-long stay',
    'What are my car rental options?',
    'What recommendations do you have on excursions?',
  ]

  useEffect(() => {
    // Initial message from agent
    setMessages([
      {
        id: nanoid(),
        text: 'Hello! How can I help you plan your trip today? Please enter your Passenger ID to start.',
        sender: 'agent',
      },
    ])
    // Do not create a new thread until passenger ID is provided and first message is sent
  }, [])

  const createNewThread = async () => {
    try {
      const response = await fetch(`${API_URL}/chat/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setThreadId(data.thread_id)
      console.log('New thread created:', data.thread_id)
    } catch (error) {
      console.error('Error creating new thread:', error)
      const errorMessage: Message = {
        id: nanoid(),
        text: 'Sorry, I could not start a new conversation. Please try again later.',
        sender: 'agent',
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
  }

  const handleSendMessage = async () => {
    if (input.trim() === '') return
    if (passengerId.trim() === '') {
      alert('Please enter your Passenger ID.')
      return
    }

    const newUserMessage: Message = {
      id: nanoid(),
      text: input,
      sender: 'user',
    }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInput('')

    // If no threadId exists, create a new one for the first message
    let currentThreadId = threadId
    if (!currentThreadId) {
      try {
        const response = await fetch(`${API_URL}/chat/new`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        currentThreadId = data.thread_id
        setThreadId(currentThreadId)
        console.log('New thread created for first message:', currentThreadId)
      } catch (error) {
        console.error('Error creating new thread on first message:', error)
        const errorMessage: Message = {
          id: nanoid(),
          text: 'Sorry, I could not start a new conversation. Please try again later.',
          sender: 'agent',
        }
        setMessages((prevMessages) => [...prevMessages, errorMessage])
        return // Stop execution if thread creation fails
      }
    }

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          passenger_id: passengerId,
          thread_id: currentThreadId, // Use the potentially new threadId
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const agentResponse: Message = {
        id: nanoid(),
        text: data.response,
        sender: 'agent',
      }
      setMessages((prevMessages) => [...prevMessages, agentResponse])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: nanoid(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'agent',
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
  }

  const handleSuggestedQuestionClick = (question: string) => {
    setInput(question)
    // Optionally, send message immediately after clicking suggested question
    // handleSendMessage();
  }

  return (
    <div className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden glassmorphic gradient-blue-green">
      <div className="p-4 bg-blue-600 text-white text-xl font-semibold text-shadow-outline">
        Travel Agent Chatbot
      </div>
      <div className="p-4 border-b flex items-center bg-blue-500 bg-opacity-30">
        <label htmlFor="passengerId" className="text-white mr-2 text-shadow-outline">Passenger ID:</label>
        <input
          id="passengerId"
          type="text"
          placeholder="Enter Passenger ID..."
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
        />
      </div>
      <div className="flex-grow p-4 overflow-y-auto" style={{ height: '400px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`${
                message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'
              } p-2 rounded-lg max-w-[70%]`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-blue-400 bg-blue-500 bg-opacity-30">
        <div className="text-white mb-2 text-shadow-outline">Suggested Questions:</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestionClick(question)}
              className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm rounded-full hover:bg-opacity-40 transition-colors text-shadow-outline"
            >
              {question}
            </button>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-shadow-outline"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
} 