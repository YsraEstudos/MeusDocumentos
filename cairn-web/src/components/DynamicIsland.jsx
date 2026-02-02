import { motion } from 'framer-motion';
import { Book, Compass } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import './DynamicIsland.css';

const DynamicIsland = ({ activeTab, setActiveTab }) => {
    return (
        <div className="dock-container">
            <motion.div
                className="dynamic-island"
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="island-content">

                    {/* Navegação Principal */}
                    <button
                        className={`island-icon ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <Compass size={20} />
                        {activeTab === 'history' && <span className="label">Explorar</span>}
                    </button>

                    <button
                        className={`island-icon ${activeTab === 'logbook' ? 'active' : ''}`}
                        onClick={() => setActiveTab('logbook')}
                    >
                        <Book size={20} />
                        {activeTab === 'logbook' && <span className="label">Logbook</span>}
                    </button>

                    <div className="separator"></div>

                    {/* Seletor de Temas Integrado */}
                    <ThemeSwitcher />

                </div>
            </motion.div>
        </div>
    );
};

export default DynamicIsland;
