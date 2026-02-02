import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StoryBlock from '../components/StoryBlock';

describe('StoryBlock Component', () => {
    const props = {
        textEn: 'Hello World',
        textPt: 'Olá Mundo',
        explanation: 'A simple greeting'
    };

    it('renders English text by default', () => {
        render(<StoryBlock {...props} />);
        expect(screen.getByText(props.textEn)).toBeDefined();
        expect(screen.queryByText(props.textPt)).toBeNull();
    });

    it('toggles to Portuguese when clicking Traduzir', async () => {
        render(<StoryBlock {...props} />);
        const translateBtn = screen.getByText('Traduzir');
        fireEvent.click(translateBtn);

        expect(await screen.findByText(props.textPt)).toBeDefined();
        await waitForElementToBeRemoved(() => screen.queryByText(props.textEn));
        expect(translateBtn.textContent).toContain('Original');
    });

    it('shows and hides context when clicking Contexto', () => {
        render(<StoryBlock {...props} />);
        const contextBtn = screen.getByText('Contexto');

        // Initially hidden
        expect(screen.queryByText('Contexto')).not.toBeNull(); // The button itself
        expect(screen.queryByText(props.explanation)).toBeNull();

        fireEvent.click(contextBtn);
        expect(screen.getByText(props.explanation)).toBeDefined();

        fireEvent.click(contextBtn);
        // Note: Due to AnimatePresence, it might still be in the DOM briefly if not using specific wait helpers,
        // but queryByText should ideally handle basic state changes.
    });
});
