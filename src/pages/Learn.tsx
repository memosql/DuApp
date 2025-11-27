import React, { useState } from 'react';
import { Check, X, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import clsx from 'clsx';

const Learn: React.FC = () => {
    const { words, learnedWords, markAsLearned, incrementStreak } = useApp();

    // Filter words that are NOT learned yet
    const wordsToLearn = words.filter(w => !learnedWords.includes(w.id));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);

    const currentWord = wordsToLearn[currentIndex];

    const handleNext = (known: boolean) => {
        if (known && currentWord) {
            markAsLearned(currentWord.id);
        }

        setIsFlipped(false);

        if (currentIndex < wordsToLearn.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
        } else {
            setSessionComplete(true);
            incrementStreak();
        }
    };

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentWord) {
            const utterance = new SpeechSynthesisUtterance(currentWord.german);
            utterance.lang = 'de-DE';
            window.speechSynthesis.speak(utterance);
        }
    };

    if (wordsToLearn.length === 0 && !sessionComplete) {
        return (
            <div className="p-6 flex flex-col items-center justify-center h-[80vh] text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check size={48} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Alles erledigt!</h2>
                <p className="text-gray-500">Du hast alle Wörter gelernt. Füge neue Wörter im Wörterbuch hinzu.</p>
            </div>
        );
    }

    if (sessionComplete) {
        return (
            <div className="p-6 flex flex-col items-center justify-center h-[80vh] text-center animate-in zoom-in">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tagesziel erreicht!</h2>
                <p className="text-gray-500 mb-8">Du hast deine tägliche Lektion abgeschlossen.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition"
                >
                    Zurück zum Start
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col h-[calc(100vh-80px)]">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Lernen</span>
                    <span>{currentIndex + 1} / {wordsToLearn.length}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${((currentIndex) / wordsToLearn.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Flashcard Area */}
            <div className="flex-1 flex flex-col items-center justify-center perspective-1000">
                <div
                    className={clsx(
                        "relative w-full max-w-sm aspect-[3/4] transition-all duration-500 transform-style-3d cursor-pointer",
                        isFlipped ? "rotate-y-180" : ""
                    )}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border-2 border-gray-100 flex flex-col items-center justify-center p-8 text-center">
                        <span className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">German</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">{currentWord.german}</h2>
                        <button
                            onClick={handleSpeak}
                            className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center hover:bg-blue-100 transition"
                        >
                            <Volume2 size={24} />
                        </button>
                        <p className="mt-8 text-gray-400 text-sm">Tap to flip</p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary text-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
                        <span className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-4">Meaning</span>
                        <h3 className="text-3xl font-bold mb-2">{currentWord.english}</h3>
                        <p className="text-xl text-blue-100 mb-6">{currentWord.arabic}</p>

                        <div className="bg-white/10 p-4 rounded-xl w-full">
                            <p className="text-sm italic opacity-90">"{currentWord.example}"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                    onClick={() => handleNext(false)}
                    className="py-4 rounded-xl border-2 border-red-100 bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition"
                >
                    <X size={20} />
                    Noch nicht
                </button>
                <button
                    onClick={() => handleNext(true)}
                    className="py-4 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:bg-green-600 transition"
                >
                    <Check size={20} />
                    Gewusst
                </button>
            </div>
        </div>
    );
};

export default Learn;
