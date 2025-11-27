import React, { useState } from 'react';
import { Search, Plus, Volume2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Word } from '../types';

const Dictionary: React.FC = () => {
    const { words, addWord, deleteWord } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'All' | 'A1' | 'A2'>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter words
    const filteredWords = words.filter(word => {
        const matchesSearch = word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.arabic.includes(searchTerm);
        const matchesFilter = filter === 'All' || word.level === filter;
        return matchesSearch && matchesFilter;
    });

    const handleSpeak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="p-6 pb-24">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Wörterbuch</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Search & Filter */}
            <div className="space-y-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search / Suche / بحث"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {['All', 'A1', 'A2'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === f
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Word List */}
            <div className="space-y-3">
                {filteredWords.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <p>Keine Wörter gefunden.</p>
                    </div>
                ) : (
                    filteredWords.map((word) => (
                        <div key={word.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg text-gray-900">{word.german}</h3>
                                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-medium">{word.level}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{word.english} • {word.arabic}</p>
                                <p className="text-gray-400 text-xs mt-2 italic">"{word.example}"</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleSpeak(word.german)}
                                    className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition"
                                >
                                    <Volume2 size={20} />
                                </button>
                                <button
                                    onClick={() => deleteWord(word.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Word Modal */}
            {isModalOpen && (
                <AddWordModal onClose={() => setIsModalOpen(false)} onAdd={addWord} />
            )}
        </div>
    );
};

const AddWordModal: React.FC<{ onClose: () => void; onAdd: (w: Word) => void }> = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState<Partial<Word>>({
        level: 'A1',
        category: 'General'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.german && formData.english && formData.arabic) {
            onAdd({
                id: Date.now().toString(),
                german: formData.german,
                english: formData.english,
                arabic: formData.arabic,
                example: formData.example || '',
                level: formData.level as 'A1' | 'A2',
                category: formData.category || 'General'
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in slide-in-from-bottom-10 fade-in">
                <h2 className="text-xl font-bold mb-4">Neues Wort hinzufügen</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">German</label>
                        <input
                            required
                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                            placeholder="z.B. der Tisch"
                            value={formData.german || ''}
                            onChange={e => setFormData({ ...formData, german: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">English</label>
                            <input
                                required
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                                placeholder="Table"
                                value={formData.english || ''}
                                onChange={e => setFormData({ ...formData, english: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Arabic</label>
                            <input
                                required
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary outline-none text-right"
                                placeholder="طاولة"
                                value={formData.arabic || ''}
                                onChange={e => setFormData({ ...formData, arabic: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Example Sentence</label>
                        <input
                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                            placeholder="Der Tisch ist braun."
                            value={formData.example || ''}
                            onChange={e => setFormData({ ...formData, example: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-gray-600 font-medium">Cancel</button>
                        <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-blue-200">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dictionary;
