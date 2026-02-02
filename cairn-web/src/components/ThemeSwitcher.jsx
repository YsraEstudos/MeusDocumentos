import { Moon, Sun, Scroll } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    const themes = [
        { id: 'amoled', icon: Moon, label: 'Amoled' },
        { id: 'classic', icon: Scroll, label: 'Classic' },
        { id: 'glacial', icon: Sun, label: 'Glacial' },
    ];

    return (
        <div className="theme-switcher" style={{ display: 'flex', gap: '8px', padding: '0 8px' }}>
            {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;

                return (
                    <button
                        key={t.id}
                        onClick={() => toggleTheme(t.id)}
                        style={{
                            background: isActive ? 'var(--accent-glow)' : 'transparent',
                            border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            transition: 'all 0.3s ease'
                        }}
                        title={t.label}
                    >
                        <Icon size={14} />
                    </button>
                );
            })}
        </div>
    );
};

export default ThemeSwitcher;
