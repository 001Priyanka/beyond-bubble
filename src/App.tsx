import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import HomePage from './pages/HomePage.js';
import ExplorePage from './pages/ExplorePage.js';
import FeedPage from './pages/FeedPage.js';
import AnalysisPage from './pages/AnalysisPage.js';
import PerspectivesPage from './pages/PerspectivesPage.js';
import ChallengePage from './pages/ChallengePage.js';
import ReflectionPage from './pages/ReflectionPage.js';
import DesignSystemPage from './pages/DesignSystemPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/perspectives" element={<PerspectivesPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/reflection" element={<ReflectionPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
