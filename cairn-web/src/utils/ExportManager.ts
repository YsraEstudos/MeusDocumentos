import { saveAs } from 'file-saver';
import { VocabularyItem, StorySection } from '../types';
import type { Paragraph, Table } from 'docx';
import { PdfCursor } from './PdfHelper';

// --- Configuration Constants ---
const THEME_COLOR_BLUE: [number, number, number] = [0, 113, 227];
const THEME_COLOR_GRAY: number = 100;
const THEME_COLOR_DARK: number = 0;

/**
 * Export Utility for Cairn Logs
 */
const ExportManager = {

    /**
     * Download as Markdown (.md)
     */
    downloadMarkdown: async (vocabulary: VocabularyItem[], stories: StorySection[]): Promise<boolean> => {
        try {
            let content = `# Cairn Logbook Export\nGenerated on ${new Date().toLocaleDateString()}\n\n`;

            content += `## 📖 Dicionário de Campo\n\n| Termo | Tradução | Contexto |\n|-------|----------|----------|\n`;
            vocabulary.forEach(item => {
                // Sanitize content to prevent breaking md tables
                const cleanContext = item.context.replace(/[\n\r]+/g, ' ').replace(/\|/g, '\\|');
                content += `| **${item.term}** | ${item.translation} | ${cleanContext} |\n`;
            });

            content += `\n---\n\n## 🏔️ Diário de Bordo (Stories)\n\n`;

            stories.forEach(section => {
                content += `### ${section.icon ? getEmoji(section.icon) : ''} ${section.title || 'Untitled Section'}\n\n`;
                section.stories.forEach(story => {
                    content += `> **Original**: ${story.textEn}\n>\n`;
                    content += `> **Tradução**: ${story.textPt}\n>\n`;
                    content += `> *Contexto*: ${story.explanation}\n\n`;
                    content += `---\n\n`;
                });
            });

            const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
            saveAs(blob, `cairn-logbook-${Date.now()}.md`);
            return true;
        } catch (error) {
            console.error("Markdown export failed:", error);
            return false;
        }
    },

    /**
     * Download as Microsoft Word (.docx)
     */
    downloadWord: async (vocabulary: VocabularyItem[], stories: StorySection[]): Promise<boolean> => {
        try {
            // Dynamic import for docx to save bundle size
            const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } = await import('docx');

            const createVocabularyTable = (items: VocabularyItem[]) => {
                return new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            tableHeader: true,
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Termo", bold: true })] })], shading: { fill: "F5F5F5" } }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tradução", bold: true })] })], shading: { fill: "F5F5F5" } }),
                                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Contexto", bold: true })] })], shading: { fill: "F5F5F5" } }),
                            ]
                        }),
                        ...items.map(item => new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ text: item.term, style: "Strong" })] }),
                                new TableCell({ children: [new Paragraph(item.translation)] }),
                                new TableCell({ children: [new Paragraph(item.context)] }),
                            ]
                        }))
                    ],
                });
            };

            const doc = new Document({
                sections: [{
                    children: [
                        new Paragraph({
                            text: "Cairn Logbook Export",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 300 }
                        }),
                        new Paragraph({
                            text: `Generated on ${new Date().toLocaleDateString()}`,
                            spacing: { after: 500 },
                            style: "Subtitle"
                        }),

                        // Vocabulary
                        new Paragraph({
                            text: "Dicionário de Campo",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 400, after: 200 }
                        }),
                        createVocabularyTable(vocabulary),

                        // Stories
                        new Paragraph({
                            text: "Diário de Bordo",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 600, after: 300 }
                        }),
                        ...stories.flatMap(section => [
                            new Paragraph({
                                text: section.title,
                                heading: HeadingLevel.HEADING_3,
                                spacing: { before: 300, after: 150 }
                            }),
                            ...section.stories.flatMap(story => [
                                new Paragraph({
                                    children: [new TextRun({ text: story.textEn, italics: true })],
                                    spacing: { after: 100 },
                                    border: { left: { style: BorderStyle.SINGLE, size: 6, space: 10, color: "CCCCCC" } }, // Quote style
                                    indent: { left: 300 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: "Tradução: ", bold: true }),
                                        new TextRun({ text: story.textPt, color: "0071E3" })
                                    ],
                                    spacing: { after: 100 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: "Contexto: ", bold: true, color: "666666" }),
                                        new TextRun({ text: story.explanation, color: "666666" })
                                    ],
                                    spacing: { after: 400 }
                                })
                            ])
                        ])
                    ],
                }],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `cairn-logbook-${Date.now()}.docx`);
            return true;

        } catch (error) {
            console.error("Word export failed:", error);
            return false;
        }
    },

    /**
     * Download as PDF with robust layout engine
     */
    downloadPDF: async (vocabulary: VocabularyItem[], stories: StorySection[]): Promise<boolean> => {
        try {
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();
            const cursor = new PdfCursor(doc);

            // Title
            cursor.addSpace(10);
            cursor.addText("Cairn Logbook Export", 22, "bold", THEME_COLOR_DARK);
            cursor.addText(`Generated on ${new Date().toLocaleDateString()}`, 10, "normal", THEME_COLOR_GRAY);
            cursor.addSpace(20);

            // --- Vocabulary Section ---
            cursor.addText("Dicionário de Campo", 16, "bold", THEME_COLOR_DARK, 'left', 5);

            vocabulary.forEach(item => {
                cursor.ensureSpace(20); // Check if we are near bottom before starting an item context block

                cursor.addText(`• ${item.term}`, 12, "bold", THEME_COLOR_DARK, 'left', 1);
                cursor.addText(`  ${item.translation}`, 11, "normal", THEME_COLOR_BLUE, 'left', 2);
                cursor.addText(`  ${item.context}`, 10, "normal", THEME_COLOR_GRAY, 'left', 5);
                cursor.addSpace(5);
            });

            cursor.addSpace(15);

            // --- Stories Section ---
            cursor.addText("Diário de Bordo", 16, "bold", THEME_COLOR_DARK, 'left', 10);

            stories.forEach(section => {
                cursor.addSpace(5);
                cursor.addText(section.title || "Section", 14, "bold", THEME_COLOR_DARK, 'left', 5);

                section.stories.forEach(story => {
                    cursor.ensureSpace(40); // Atomic block check

                    // English
                    cursor.addText(story.textEn, 11, "italic", THEME_COLOR_DARK, 'left', 3);

                    // Portuguese
                    cursor.addText(story.textPt, 11, "bold", THEME_COLOR_BLUE, 'left', 3);

                    // Explanation
                    cursor.addText(`Contexto: ${story.explanation}`, 10, "normal", THEME_COLOR_GRAY, 'left', 8);

                    // Separator
                    cursor.ensureSpace(5);
                });
            });

            doc.save(`cairn-logbook-${Date.now()}.pdf`);
            return true;

        } catch (error) {
            console.error("PDF export failed:", error);
            return false;
        }
    }
};

function getEmoji(iconName: string) {
    const map: Record<string, string> = { 'BookOpen': '📖', 'AlertTriangle': '⚠️', 'Home': '🏠', 'FileText': '📄' };
    return map[iconName] || '🔹';
}

export default ExportManager;
