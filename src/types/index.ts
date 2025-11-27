export interface Word {
    id: string;
    german: string;
    arabic: string;
    english: string;
    example: string;
    level: 'A1' | 'A2';
    category: string;
}

export interface GrammarLesson {
    id: string;
    title: string;
    description: string;
    examples: { german: string; arabic: string }[];
}

export interface ConversationLine {
    speaker: string;
    text: string;
    translation: string;
}

export interface Conversation {
    id: string;
    title: string;
    dialogue: ConversationLine[];
}

export interface ThematicPack {
    id: string;
    title: string;
    words_count: number;
    level: 'A1' | 'A2';
}

export interface AppData {
    daily_words: Word[];
    grammar_lessons: GrammarLesson[];
    conversations: Conversation[];
    thematic_packs: ThematicPack[];
}
