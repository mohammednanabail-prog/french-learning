import React, { useState, useEffect } from 'react';
import { INITIAL_SENTENCES } from './data/initialSentences';
import { SentenceItem } from './types';
import { BottomNav, TabType } from './components/BottomNav';
import { HeaderBanner } from './components/HeaderBanner';
import { CategoryLibraryView } from './components/CategoryLibraryView';
import { MySentencesView } from './components/MySentencesView';
import { SentenceDetailView } from './components/SentenceDetailView';
import { AddSentenceModal } from './components/AddSentenceModal';
import { SettingsView } from './components/SettingsView';

const STORAGE_CUSTOM_KEY = 'french_learning_custom_sentences';
const STORAGE_FAVS_KEY = 'french_learning_favorites';
const STORAGE_API_KEY = 'french_learning_gemini_key';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedSentence, setSelectedSentence] = useState<SentenceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load custom sentences from localStorage
  const [customSentences, setCustomSentences] = useState<SentenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading custom sentences:', e);
    }
    return [];
  });

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading favorites:', e);
    }
    return ['daily-1', 'shop-3', 'travel-1'];
  });

  // Load Gemini API Key
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_API_KEY) || '';
    } catch (e) {
      return '';
    }
  });

  // Save custom sentences
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(customSentences));
    } catch (e) {
      console.error('Failed to save custom sentences to localStorage', e);
    }
  }, [customSentences]);

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Save API key
  const handleUpdateApiKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      localStorage.setItem(STORAGE_API_KEY, newKey);
    } catch (e) {
      console.error('Failed to save API key to localStorage', e);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add new sentence
  const handleSaveSentence = (newSentence: SentenceItem) => {
    setCustomSentences((prev) => [newSentence, ...prev]);
    // Also select and view it directly
    setSelectedSentence(newSentence);
  };

  // Delete sentence
  const handleDeleteCustomSentence = (id: string) => {
    setCustomSentences((prev) => prev.filter((s) => s.id !== id));
    if (selectedSentence?.id === id) {
      setSelectedSentence(null);
    }
  };

  // Import sentences
  const handleImportSentences = (imported: SentenceItem[]) => {
    setCustomSentences((prev) => [...imported, ...prev]);
  };

  // Reset data
  const handleResetAllData = () => {
    setCustomSentences([]);
    setFavorites(['daily-1', 'shop-3', 'travel-1']);
    localStorage.removeItem(STORAGE_CUSTOM_KEY);
    localStorage.removeItem(STORAGE_FAVS_KEY);
    setSelectedSentence(null);
  };

  // Combined sentence list
  const allSentences = [...customSentences, ...INITIAL_SENTENCES];

  const handleSelectSentence = (sentence: SentenceItem) => {
    setSelectedSentence(sentence);
  };

  const handleBackFromDetail = () => {
    setSelectedSentence(null);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedSentence(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Centered Mobile-First Applet Container */}
      <div className="w-full max-w-lg mx-auto min-h-screen flex flex-col px-4 pt-3 pb-24 relative">
        {/* Dynamic Screen View */}
        {selectedSentence ? (
          <SentenceDetailView
            sentence={selectedSentence}
            onBack={handleBackFromDetail}
            isFavorited={favorites.includes(selectedSentence.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HeaderBanner
                onNavigate={handleTabChange}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}

            {activeTab === 'library' && (
              <CategoryLibraryView
                sentences={allSentences}
                onSelectSentence={handleSelectSentence}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onBackToHome={() => handleTabChange('home')}
              />
            )}

            {activeTab === 'custom' && (
              <MySentencesView
                customSentences={customSentences}
                allSentences={allSentences}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onDeleteCustomSentence={handleDeleteCustomSentence}
                onSelectSentence={handleSelectSentence}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                onBackToHome={() => handleTabChange('home')}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                apiKey={apiKey}
                onSaveApiKey={handleUpdateApiKey}
                customSentences={customSentences}
                onImportSentences={handleImportSentences}
                onResetAllData={handleResetAllData}
                onBackToHome={() => handleTabChange('home')}
              />
            )}
          </>
        )}
      </div>

      {/* Fixed Ergonomic Bottom Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        customCount={customSentences.length}
      />

      {/* Add New Sentence Modal */}
      <AddSentenceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveSentence={handleSaveSentence}
        apiKey={apiKey}
        onUpdateApiKey={handleUpdateApiKey}
      />
    </div>
  );
}
