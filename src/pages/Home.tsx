import React from 'react';
import { Flame, Play, ChevronRight } from 'lucide-react';

import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
    const { streak, words } = useApp();
    const todayWords = words.slice(0, 5); // Mock: First 5 words for today

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Guten Morgen!</h1>
                    <p className="text-gray-500">Bereit für Tag 5?</p>
                </div>
                <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-bold text-sm">
                    <Flame size={18} fill="currentColor" />
                    <span>{streak}</span>
                </div>
            </header>

            {/* Daily Progress Card */}
            <div className="bg-primary text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2">Tagesziel</h2>
                    <p className="text-blue-100 mb-6">Lerne 10 neue Wörter</p>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-blue-800/50 h-2 rounded-full overflow-hidden">
                            <div className="bg-accent h-full w-1/3 rounded-full"></div>
                        </div>
                        <span className="font-bold">3/10</span>
                    </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Today's Tasks */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Deine Aufgaben</h3>

                {/* Task 1: New Words */}
                <div
                    onClick={() => window.location.href = '/learn'}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-primary">
                            <span className="text-xl font-bold">Aa</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Neue Wörter</h4>
                            <p className="text-sm text-gray-500">{todayWords.length} Wörter warten</p>
                        </div>
                    </div>
                    <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play size={20} fill="currentColor" />
                    </button>
                </div>

                {/* Task 2: Conversation */}
                <div
                    onClick={() => window.location.href = '/conversation'}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <span className="text-xl">💬</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Morgengespräch</h4>
                            <p className="text-sm text-gray-500">2 min Übung</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400">
                        <ChevronRight size={20} />
                    </div>
                </div>
            </section>

            {/* Quick Grammar Tip */}
            <section>
                <div className="bg-secondary/30 p-5 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm uppercase tracking-wider">
                        <span>Grammatik Tipp</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Der, Die, Das?</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Words ending in <span className="font-mono bg-white px-1 rounded text-primary">-ung</span> are usually feminine (Die).
                        <br />Example: <em>Die Übung</em> (The exercise).
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
