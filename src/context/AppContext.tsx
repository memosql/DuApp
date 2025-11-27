import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Word, Conversation, GrammarLesson, ThematicPack } from '../types';
import { germanData } from '../data/german_data';

interface AppContextType {
    words: Word[];
    addWord: (word: Word) => void;
    deleteWord: (id: string) => void;
    learnedWords: string[]; // IDs of learned words
    markAsLearned: (id: string) => void;
    streak: number;
    incrementStreak: () => void;
    grammarLessons: GrammarLesson[];
    conversations: Conversation[];
    thematicPacks: ThematicPack[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load initial state from localStorage or default data
    const [words, setWords] = useState<Word[]>(() => {
        const saved = localStorage.getItem('german_app_words');
        return saved ? JSON.parse(saved) : germanData.daily_words;
    });

    const [learnedWords, setLearnedWords] = useState<string[]>(() => {
        const saved = localStorage.getItem('german_app_learned');
        return saved ? JSON.parse(saved) : [];
    });

    const [streak, setStreak] = useState<number>(() => {
        const saved = localStorage.getItem('german_app_streak');
        return saved ? parseInt(saved) : 0;
    });

    // Persist changes
    useEffect(() => {
        localStorage.setItem('german_app_words', JSON.stringify(words));
    }, [words]);

    useEffect(() => {
        localStorage.setItem('german_app_learned', JSON.stringify(learnedWords));
    }, [learnedWords]);

    useEffect(() => {
        localStorage.setItem('german_app_streak', streak.toString());
    }, [streak]);

    const addWord = (word: Word) => {
        setWords(prev => [word, ...prev]);
    };

    const deleteWord = (id: string) => {
        setWords(prev => prev.filter(w => w.id !== id));
    };

    const markAsLearned = (id: string) => {
        if (!learnedWords.includes(id)) {
            setLearnedWords(prev => [...prev, id]);
        }
    };

    const incrementStreak = () => {
        setStreak(prev => prev + 1);
    };

    return (
        <AppContext.Provider value={{
            words,
            addWord,
            deleteWord,
            learnedWords,
            markAsLearned,
            streak,
            incrementStreak,
            grammarLessons: germanData.grammar_lessons,
            conversations: germanData.conversations,
            thematicPacks: germanData.thematic_packs
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
