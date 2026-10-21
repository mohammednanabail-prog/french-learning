import React from 'react';
import { Home, BookOpen, Heart, Settings } from 'lucide-react';

export type TabType = 'home' | 'library' | 'custom' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  customCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  customCount,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'الرئيسية',
      icon: Home,
    },
    {
      id: 'library' as TabType,
      label: 'المكتبة',
      icon: BookOpen,
    },
    {
      id: 'custom' as TabType,
      label: 'جملي الخاصة',
      icon: Heart,
      badge: customCount > 0 ? customCount : null,
    },
    {
      id: 'settings' as TabType,
      label: 'الإعدادات',
      icon: Settings,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d1428]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1 max-w-lg mx-auto shadow-2xl">
      <div className="grid grid-cols-4 items-center h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-all duration-200 select-none ${
                isActive
                  ? 'text-indigo-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5px] drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 min-w-[16px] h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 tracking-tight ${
                  isActive ? 'text-indigo-300 font-bold' : 'text-slate-400 font-medium'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-1 bg-indigo-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
