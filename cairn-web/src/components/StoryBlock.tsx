import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Info } from 'lucide-react';
import { useDisclosure } from '../hooks/useDisclosure';
import '../styles/MacTheme.css';

interface StoryBlockProps {
    textEn: string;
    textPt: string;
    explanation: string;
}

const StoryBlock = ({ textEn, textPt, explanation }: StoryBlockProps) => {
    const translation = useDisclosure(false);
    const context = useDisclosure(false);

    return (
        <article className="mac-card">

            {/* Área da Explicação */}
            <AnimatePresence>
                {context.isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 15 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="overflow-hidden"
                    >
                        <div style={{ background: 'rgba(255, 214, 10, 0.1)', padding: '12px', borderRadius: '12px', color: '#ffd60a', fontSize: '0.9rem' }}>
                            <strong style={{ display: 'block', marginBottom: '4px', color: '#fff' }}>Contexto</strong>
                            {explanation}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Texto Principal */}
            <div style={{ minHeight: '60px', marginBottom: '20px' }}>
                <AnimatePresence mode='popLayout' initial={false}>
                    {!translation.isOpen ? (
                        <motion.p
                            key="en"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#f5f5f7', margin: 0 }}
                        >
                            {textEn}
                        </motion.p>
                    ) : (
                        <motion.p
                            key="pt"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#2997ff', fontWeight: '500', margin: 0 }}
                        >
                            {textPt}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                    onClick={translation.toggle}
                    className={`mac-btn ${translation.isOpen ? 'primary' : ''}`}
                >
                    <Languages size={15} />
                    {translation.isOpen ? 'Original' : 'Traduzir'}
                </button>

                <button
                    onClick={context.toggle}
                    className="mac-btn"
                    style={{ background: context.isOpen ? 'rgba(255,255,255,0.2)' : '' }}
                >
                    <Info size={15} />
                    Contexto
                </button>
            </div>
        </article>
    );
};

export default StoryBlock;
