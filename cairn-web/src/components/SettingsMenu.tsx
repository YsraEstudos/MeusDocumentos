import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Download, FileText, FileType, File } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import ExportManager from '../utils/ExportManager';
import { vocabulary } from '../data/vocabulary';
import { mountainStories } from '../data/stories';
import { useDisclosure } from '../hooks/useDisclosure';
import './SettingsMenu.css';

const SettingsMenu = () => {
    const { isOpen, toggle, close } = useDisclosure(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [close]);

    const handleExport = async (type: 'word' | 'pdf' | 'md') => {
        if (isExporting) return;
        setIsExporting(true);

        // Small delay to allow UI to update before heavy sync work (if any)
        await new Promise(resolve => setTimeout(resolve, 100));

        let success = false;
        try {
            if (type === 'word') {
                success = await ExportManager.downloadWord(vocabulary, mountainStories);
            } else if (type === 'pdf') {
                success = await ExportManager.downloadPDF(vocabulary, mountainStories);
            } else if (type === 'md') {
                success = await ExportManager.downloadMarkdown(vocabulary, mountainStories);
            }

            if (!success) {
                alert("Falha ao exportar. Verifique o console para mais detalhes.");
            }
        } catch (e) {
            console.error(e);
            alert("Erro inesperado durante a exportação.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="settings-container" ref={menuRef}>
            <button
                className={`island-icon ${isOpen ? 'active' : ''}`}
                onClick={toggle}
                title="Configurações"
            >
                <Settings size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="settings-dropdown"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Theme Section */}
                        <div>
                            <span className="section-label settings-section-label">Tema</span>
                            <div className="settings-theme-wrapper">
                                <ThemeSwitcher />
                            </div>
                        </div>

                        {/* Export Section */}
                        <div>
                            <span className="section-label settings-section-label">Exportar Dados</span>
                            <div className="settings-export-list">

                                <button
                                    className={`mac-btn settings-export-btn ${isExporting ? 'loading' : ''}`}
                                    onClick={() => handleExport('word')}
                                    disabled={isExporting}
                                >
                                    <FileText size={16} />
                                    {isExporting ? 'Gerando...' : 'Word (.docx)'}
                                </button>

                                <button
                                    className={`mac-btn settings-export-btn ${isExporting ? 'loading' : ''}`}
                                    onClick={() => handleExport('pdf')}
                                    disabled={isExporting}
                                >
                                    <File size={16} />
                                    {isExporting ? 'Gerando...' : 'PDF (.pdf)'}
                                </button>

                                <button
                                    className={`mac-btn settings-export-btn ${isExporting ? 'loading' : ''}`}
                                    onClick={() => handleExport('md')}
                                    disabled={isExporting}
                                >
                                    <FileType size={16} />
                                    {isExporting ? 'Gerando...' : 'Markdown (.md)'}
                                </button>

                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SettingsMenu;
