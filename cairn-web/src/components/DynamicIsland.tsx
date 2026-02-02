import { motion } from 'framer-motion';
import { Book, Compass } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SettingsMenu from './SettingsMenu';
import './DynamicIsland.css';

const DynamicIsland = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on current path
    const activeTab = location.pathname.includes('logbook') ? 'logbook' : 'history';

    return (
        <nav className="dock-container">
            <motion.div
                className="dynamic-island"
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="island-content">

                    {/* Navegação Principal */}
                    <button
                        className={`island-icon ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => navigate('/history')}
                        title="Explorar"
                    >
                        <Compass size={20} />
                        {activeTab === 'history' && <span className="label">Explorar</span>}
                    </button>

                    <button
                        className={`island-icon ${activeTab === 'logbook' ? 'active' : ''}`}
                        onClick={() => navigate('/logbook')}
                        title="Logbook"
                    >
                        <Book size={20} />
                        {activeTab === 'logbook' && <span className="label">Logbook</span>}
                    </button>

                    <div className="separator"></div>

                    {/* Menu de Configurações (Temas + Exportação) */}
                    <SettingsMenu />

                </div>
            </motion.div>
        </nav>
    );
};

export default DynamicIsland;
