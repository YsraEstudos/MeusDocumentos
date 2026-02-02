import { MapPin, BookOpen, Languages, Info, Home, FileText, AlertTriangle } from 'lucide-react';
import StoryBlock from '../components/StoryBlock';
import { mountainStories } from '../data/stories';
import '../styles/MacTheme.css';

const IconMap = {
    BookOpen: BookOpen,
    Home: Home,
    FileText: FileText,
    AlertTriangle: AlertTriangle
};

const HistoryPage = () => {
    return (
        <div style={{ paddingTop: '40px' }}>
            <header style={{ marginBottom: '60px', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    fontSize: '0.8rem',
                    color: '#a1a1aa',
                    marginBottom: '20px'
                }}>
                    <MapPin size={14} /> REGIÃO DE KAMI
                </div>

                <h1 className="mac-title">História de Cairn</h1>
                <p className="mac-subtitle">Registros de Exploração e Cultura Troglodita</p>
            </header>

            <main>
                {mountainStories.map((section) => (
                    <div key={section.id}>
                        {section.title && (
                            <>
                                {section.icon && IconMap[section.icon] ? (
                                    <div style={{ height: '40px' }}></div>
                                ) : null}
                                <span className="section-label" style={section.icon ? { display: 'flex', alignItems: 'center', gap: '8px' } : {}}>
                                    {section.icon && IconMap[section.icon] &&
                                        (() => {
                                            const Icon = IconMap[section.icon];
                                            return <Icon size={16} />;
                                        })()
                                    }
                                    {section.title}
                                </span>
                            </>
                        )}

                        {section.stories.map((story, index) => (
                            <StoryBlock
                                key={index}
                                textEn={story.textEn}
                                textPt={story.textPt}
                                explanation={story.explanation}
                            />
                        ))}
                    </div>
                ))}
            </main>

            <footer style={{ textAlign: 'center', marginTop: '60px', color: '#555', fontSize: '0.8rem' }}>
                <p>"We welcome any questions you may have."</p>
            </footer>
        </div>
    );
};

export default HistoryPage;
