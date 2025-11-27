import type { AppData } from '../types';

export const germanData: AppData = {
    daily_words: [
        {
            id: "w1",
            german: "der Apfel",
            arabic: "التفاحة",
            english: "The apple",
            example: "Ich esse einen Apfel.",
            level: "A1",
            category: "Food"
        },
        {
            id: "w2",
            german: "arbeiten",
            arabic: "يعمل",
            english: "To work",
            example: "Ich arbeite in Berlin.",
            level: "A1",
            category: "Work"
        },
        {
            id: "w3",
            german: "das Haus",
            arabic: "المنزل",
            english: "The house",
            example: "Das Haus ist groß.",
            level: "A1",
            category: "Home"
        },
        {
            id: "w4",
            german: "morgen",
            arabic: "غداً",
            english: "Tomorrow",
            example: "Bis morgen!",
            level: "A1",
            category: "Time"
        },
        {
            id: "w5",
            german: "danke",
            arabic: "شكراً",
            english: "Thank you",
            example: "Danke schön.",
            level: "A1",
            category: "Basics"
        },
        {
            id: "w6",
            german: "bitte",
            arabic: "عفواً / من فضلك",
            english: "Please / You're welcome",
            example: "Wie bitte?",
            "level": "A1",
            category: "Basics"
        },
        {
            id: "w7",
            german: "die Katze",
            arabic: "القطة",
            english: "The cat",
            example: "Die Katze schläft.",
            level: "A1",
            category: "Animals"
        },
        {
            id: "w8",
            german: "gut",
            arabic: "جيد",
            english: "Good",
            example: "Mir geht es gut.",
            level: "A1",
            category: "Adjectives"
        },
        {
            id: "w9",
            german: "sehen",
            arabic: "يرى",
            english: "To see",
            example: "Ich sehe dich.",
            level: "A1",
            category: "Verbs"
        },
        {
            id: "w10",
            german: "schön",
            arabic: "جميل",
            english: "Beautiful",
            example: "Das Wetter ist schön.",
            level: "A1",
            category: "Adjectives"
        }
    ],
    grammar_lessons: [
        {
            id: "g1",
            title: "Artikel (Der, Die, Das)",
            description: "In German, nouns have genders: Masculine (Der), Feminine (Die), and Neutral (Das).",
            examples: [
                { german: "Der Mann", arabic: "الرجل" },
                { german: "Die Frau", arabic: "المرأة" },
                { german: "Das Kind", arabic: "الطفل" }
            ]
        },
        {
            id: "g2",
            title: "Verb Conjugation (sein)",
            description: "The verb 'to be' (sein) is irregular.",
            examples: [
                { german: "Ich bin", arabic: "أنا أكون" },
                { german: "Du bist", arabic: "أنت تكون" },
                { german: "Er/Sie/Es ist", arabic: "هو/هي تكون" }
            ]
        }
    ],
    conversations: [
        {
            id: "c1",
            title: "Kennenlernen (Getting to know)",
            dialogue: [
                { speaker: "A", text: "Hallo! Wie heißt du?", translation: "مرحباً! ما اسمك؟" },
                { speaker: "B", text: "Ich heiße Sarah. Und du?", translation: "اسمي سارة. وأنت؟" },
                { speaker: "A", text: "Ich bin Ahmed.", translation: "أنا أحمد." }
            ]
        }
    ],
    thematic_packs: [
        {
            id: "p1",
            title: "Im Restaurant",
            words_count: 20,
            level: "A1"
        },
        {
            id: "p2",
            title: "Reisen (Travel)",
            words_count: 20,
            level: "A2"
        }
    ]
};
