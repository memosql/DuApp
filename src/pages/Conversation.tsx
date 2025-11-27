import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, User, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';
import clsx from 'clsx';

const ConversationPage: React.FC = () => {
    const { conversations } = useApp();
    const [activeConversation] = useState(conversations[0]);
    const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string, translation?: string }[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize conversation
        if (activeConversation) {
            const firstMsg = activeConversation.dialogue[0];
            setMessages([{
                sender: 'bot',
                text: firstMsg.text,
                translation: firstMsg.translation
            }]);
            setCurrentStep(0);
        }
    }, [activeConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSpeak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        window.speechSynthesis.speak(utterance);
    };

    const handleRecord = () => {
        setIsRecording(true);
        // Simulate recording delay
        setTimeout(() => {
            setIsRecording(false);

            // Advance conversation logic
            const nextIndex = currentStep + 1;
            if (nextIndex < activeConversation.dialogue.length) {
                const userResponse = activeConversation.dialogue[nextIndex];

                // Add user message
                setMessages(prev => [...prev, {
                    sender: 'user',
                    text: userResponse.text,
                    translation: userResponse.translation
                }]);

                // Add bot response if exists
                const botResponseIndex = nextIndex + 1;
                if (botResponseIndex < activeConversation.dialogue.length) {
                    setTimeout(() => {
                        const botResponse = activeConversation.dialogue[botResponseIndex];
                        setMessages(prev => [...prev, {
                            sender: 'bot',
                            text: botResponse.text,
                            translation: botResponse.translation
                        }]);
                        handleSpeak(botResponse.text);
                        setCurrentStep(botResponseIndex);
                    }, 1000);
                } else {
                    setCurrentStep(nextIndex);
                }
            }
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
            {/* Header */}
            <div className="bg-white p-4 border-b border-gray-200 shadow-sm z-10">
                <h1 className="text-lg font-bold text-gray-900">{activeConversation.title}</h1>
                <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                </p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={clsx(
                            "flex gap-3 max-w-[85%]",
                            msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.sender === 'user' ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                        )}>
                            {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>

                        <div className={clsx(
                            "p-3 rounded-2xl shadow-sm relative group",
                            msg.sender === 'user'
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-white text-gray-800 rounded-tl-none"
                        )}>
                            <p className="font-medium">{msg.text}</p>
                            {msg.translation && (
                                <p className={clsx(
                                    "text-xs mt-1 border-t pt-1",
                                    msg.sender === 'user' ? "border-blue-400 text-blue-100" : "border-gray-100 text-gray-400"
                                )}>
                                    {msg.translation}
                                </p>
                            )}

                            <button
                                onClick={() => handleSpeak(msg.text)}
                                className={clsx(
                                    "absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition",
                                    msg.sender === 'user' ? "right-auto -left-8 text-gray-400" : "text-gray-400"
                                )}
                            >
                                <Play size={16} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                    {currentStep < activeConversation.dialogue.length - 1 ? (
                        <button
                            onClick={handleRecord}
                            disabled={isRecording}
                            className={clsx(
                                "flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                                isRecording
                                    ? "bg-red-50 text-red-500 animate-pulse"
                                    : "bg-primary text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                            )}
                        >
                            <Mic size={20} />
                            {isRecording ? "Listening..." : "Hold to Speak"}
                        </button>
                    ) : (
                        <div className="flex-1 text-center text-gray-500 py-3 bg-gray-100 rounded-xl">
                            Conversation Finished
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
