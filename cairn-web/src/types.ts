export type AppTheme = 'amoled' | 'classic' | 'glacial';

export interface VocabularyItem {
    term: string;
    translation: string;
    context: string;
}

export interface Story {
    textEn: string;
    textPt: string;
    explanation: string;
}

export interface StorySection {
    id: string;
    title: string;
    icon: string;
    stories: Story[];
}
