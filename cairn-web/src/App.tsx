import { useEffect, ReactNode, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './components/LoadingSpinner';

const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const LogbookPage = lazy(() => import('./pages/LogbookPage'));

function App() {
  const location = useLocation();

  // Fade in inicial
  useEffect(() => {
    document.body.style.opacity = '1';
  }, []);

  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/history"
              element={
                <PageWrapper>
                  <HistoryPage />
                </PageWrapper>
              }
            />
            <Route
              path="/logbook"
              element={
                <PageWrapper>
                  <LogbookPage />
                </PageWrapper>
              }
            />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/history" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </MainLayout>
  );
}

// Wrapper for consistent page animations
const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.98 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default App;
