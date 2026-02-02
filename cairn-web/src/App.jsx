import { useState, useEffect } from 'react';
import HistoryPage from './pages/HistoryPage';
import LogbookPage from './pages/LogbookPage';
import MainLayout from './layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('history');

  // Fade in inicial
  useEffect(() => {
    document.body.style.opacity = 1;
  }, []);

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'history' ? <HistoryPage /> : <LogbookPage />}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
