import { Play, Gamepad2 } from 'lucide-react';
import { vocabulary } from '../data/vocabulary';
import '../styles/MacTheme.css';
import gameImg from '../assets/images/imagem-jogos.png';

const LogbookPage = () => {
    return (
        <div style={{ paddingTop: '40px' }} className="animate-fade-in">

            <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 className="mac-title">Logbook</h1>
                <p className="mac-subtitle">Vocabulário e Estratégias</p>
            </header>

            {/* Hero Image Card */}
            <div className="mac-card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={gameImg} alt="Cairn Game Art" style={{ width: '100%', height: '200px', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd60a', marginBottom: '8px' }}>
                        <Gamepad2 size={18} />
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>GAMEPLAY</span>
                    </div>
                    <p style={{ color: '#ccc', margin: 0 }}>Cenas capturadas durante as sessões de jogo na região de Kami.</p>
                </div>
            </div>

            <span className="section-label">Dicionário de Campo</span>

            <div className="mac-card">
                {vocabulary.map((item, index) => (
                    <div key={index} className="mac-table-row">
                        <div className="term-text">{item.term}</div>
                        <div className="trans-text">{item.translation}</div>
                        <div className="context-text">{item.context}</div>
                    </div>
                ))}
            </div>

            <span className="section-label">Mídia</span>

            <div className="mac-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: '#2c2c2e', padding: '15px', borderRadius: '12px', color: '#2997ff' }}>
                    <Play size={24} fill="#2997ff" />
                </div>
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px', color: 'white', fontSize: '1.1rem' }}>Tutorial de Anki</h4>
                    <p style={{ margin: 0, color: '#86868b', fontSize: '0.9rem' }}>Aprenda a memorizar o vocabulário.</p>
                </div>
                <a
                    href="https://drive.google.com/drive/my-drive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mac-btn primary"
                >
                    Assistir
                </a>
            </div>

        </div>
    );
};

export default LogbookPage;
