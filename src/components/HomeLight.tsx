import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Moon, Plus, MoreHorizontal, Grid2X2, List, Trash2, ArrowRight, Settings, LogOut } from 'lucide-react';
import { RambleNote } from '../types';

interface HomeLightProps {
  notes: RambleNote[];
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
  onAddNote: () => void;
  onSelectNote: (note: RambleNote) => void;
  onToggleTheme: () => void;
  onLogoClick: () => void;
  onProfileClick: () => void;
  onSignOut: () => void;
}

type SortOption = 'latest' | 'title' | 'wordCount' | 'oldest';

export default function HomeLight({
  notes,
  onDeleteNote,
  onAddNote,
  onSelectNote,
  onToggleTheme,
  onLogoClick,
  onProfileClick,
  onSignOut,
}: HomeLightProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('oldest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  // Sort notes
  const sortedNotes = useMemo(() => {
    const list = [...filteredNotes];
    if (sortBy === 'latest') {
      return list.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
    }
    if (sortBy === 'oldest') {
      return list.sort((a, b) => new Date(a.lastEdited).getTime() - new Date(b.lastEdited).getTime());
    }
    if (sortBy === 'title') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'wordCount') {
      return list.sort((a, b) => b.wordCount - a.wordCount);
    }
    return list;
  }, [filteredNotes, sortBy]);

  return (
    <div className="h-screen bg-[#faf9f7] text-[#1a1c1b] font-sans flex flex-col selection:bg-black/5 overflow-hidden" id="home-light-container">

      {/* ==================== SCREEN 1: MOBILE VIEW (md and below) ==================== */}
      <div className="flex md:hidden flex-col h-full bg-[#faf9f7] text-[#1a1c1b] overflow-y-auto no-scrollbar relative" id="mobile-home-light">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full bg-[#faf9f7]/95 backdrop-blur-md flex justify-between items-center h-16 px-6 z-50 border-b border-black/[0.05]" id="mobile-header-light">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="w-8 h-8 rounded-full bg-[#efeeec] border border-black/10 overflow-hidden cursor-pointer flex items-center justify-center focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                id="mobile-profile-avatar-light"
              >
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5BhsV1NMrog6jzCVcbTi9cdthlVYpTVNdBbXt2gSuvkrKpS1dtbrZBuxSRfp5hnnol3q_alvPToRvdN5NGe8oWUI3Pjf0sHqKAgDTtX-ofN1zaGcK83QqWJfe8Eu4_YoqZ8LWxTgDuBdELv3wa67qcsZX4Nz3PYy1Y1pVlPQXVawu5hq9g_lvaj40wzs6l0z93RHvdmy7qL8EyfF_WGPfJjlXBxxe1dV5tV5KJMHduQlsM2ohcvceCHhdmzwzChoCrpz-BPTebw"
                  referrerPolicy="no-referrer"
                />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 top-full mt-2 w-48 bg-white border border-black/10 rounded-lg shadow-2xl z-50 overflow-hidden text-left"
                    >
                      <div className="py-1 select-none">
                        <button
                          onClick={() => {
                            setIsSettingsOpen(true);
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#5d5e61] hover:text-black hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            onSignOut();
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#5d5e61] hover:text-black hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          <h1 className="font-brand text-[22px] font-bold tracking-wider text-black uppercase select-none cursor-pointer" onClick={onLogoClick} id="mobile-brand-title-light text-primary">
            RAMBLE.
          </h1>
          <button
            onClick={onToggleTheme}
            className="text-[#5d5e61] hover:text-black transition-opacity p-2 rounded-lg"
            title="Toggle Theme"
            id="mobile-theme-toggle-light"
          >
            <Moon className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile Search bar */}
        <div className="px-6 pt-24 pb-2" id="mobile-search-bar-light">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#5d5e61]" />
            <input
              type="text"
              placeholder="Search your rambles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#efeeec] border border-black/5 rounded-xl py-3 pl-11 pr-4 text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-black/10 placeholder-[#5d5e61]/60"
            />
          </div>
        </div>

        {/* Collections Header */}
        <div className="px-6 mt-4 mb-2 flex justify-between items-center" id="mobile-collections-header-light">
          <span className="text-[11px] font-bold text-[#5d5e61] tracking-[0.15em] uppercase">
            Your Collections
          </span>
          <span className="text-[10px] text-[#5d5e61] uppercase tracking-wider font-semibold">
            {sortedNotes.length} notes
          </span>
        </div>

        {/* Bento Grid */}
        <main className="px-6 pb-32 flex-1" id="mobile-main-grid-light">
          <div className="grid grid-cols-1 gap-4">
            {sortedNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => onSelectNote(note)}
                className="group bg-white border border-[#c4c7c7] p-5 rounded-2xl active:scale-[0.98] transition-all hover:bg-[#efeeec]/50 cursor-pointer flex flex-col justify-between"
                id={`note-card-mobile-${note.id}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase font-semibold text-[#5d5e61] tracking-widest">
                    {note.version} • {note.date || '08 JAN'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id, e);
                    }}
                    className="text-[#5d5e61] hover:text-red-500 p-1"
                    title="Delete Note"
                    id={`delete-btn-mobile-${note.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-serif text-[18px] text-black font-bold mb-1 tracking-tight">
                  {note.title}
                </h3>
                <p className="font-serif text-[13px] text-[#5d5e61] line-clamp-2 opacity-70 mb-4 leading-relaxed italic">
                  "{note.content.length > 100 ? `${note.content.slice(0, 100)}...` : note.content || 'Empty ramble'}"
                </p>
                <div className="text-[11px] text-[#5d5e61] font-sans font-medium">
                  {note.wordCount.toLocaleString()} words
                </div>
              </div>
            ))}

            {sortedNotes.length === 0 && (
              <div className="text-center py-16 text-[#5d5e61] bg-white rounded-2xl p-6 border border-[#c4c7c7]" id="mobile-empty-view-light">
                <p className="text-sm">No thoughts found.</p>
                <button
                  onClick={onAddNote}
                  className="mt-2 text-xs font-bold uppercase text-black hover:underline"
                >
                  Start Rambling +
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Mobile FAB: New Ramble */}
        <button
          onClick={onAddNote}
          className="fixed bottom-8 right-6 w-14 h-14 bg-black text-[#faf9f7] rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-transform duration-150"
          title="New Ramble"
          id="mobile-fab-add"
        >
          <Plus className="h-7 w-7 stroke-[2.5]" />
        </button>
      </div>

      {/* ==================== SCREEN 2: DESKTOP VIEW (md and up) ==================== */}
      <div className="hidden md:flex flex-col h-full w-full overflow-y-auto no-scrollbar" id="desktop-home-light">
        {/* Main Header */}
        <header className="h-16 py-8 border-b border-[#c4c7c7] flex items-center justify-between px-8 sticky top-0 bg-[#faf9f7]/85 backdrop-blur-md z-50" id="desktop-header-light">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={onLogoClick} id="desktop-logo-container-light">
            <span className="font-brand text-[22px] font-bold tracking-wider text-black uppercase select-none">
              RAMBLE.
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl px-12" id="desktop-search-container-light">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5d5e61] group-focus-within:text-black transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                className="block w-full bg-[#efeeec] border-none rounded-lg py-2 pl-10 pr-3 text-sm text-[#1a1c1b] placeholder-[#5d5e61]/80 focus:ring-1 focus:ring-black/10 transition-all outline-none"
                placeholder="Search your rambles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="desktop-search-input-light"
              />
            </div>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-6" id="desktop-actions-light">
            <button
              onClick={onToggleTheme}
              className="text-[#5d5e61] hover:text-black transition-colors cursor-pointer"
              title="Dark Mode Toggle"
              id="desktop-mode-toggle-light"
            >
              <Moon className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="h-8 w-8 rounded-full overflow-hidden border border-[#c4c7c7] hover:border-black/30 transition-colors focus:outline-none cursor-pointer"
                title="Open Profile Menu"
                id="desktop-profile-avatar-container-light"
              >
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5BhsV1NMrog6jzCVcbTi9cdthlVYpTVNdBbXt2gSuvkrKpS1dtbrZBuxSRfp5hnnol3q_alvPToRvdN5NGe8oWUI3Pjf0sHqKAgDTtX-ofN1zaGcK83QqWJfe8Eu4_YoqZ8LWxTgDuBdELv3wa67qcsZX4Nz3PYy1Y1pVlPQXVawu5hq9g_lvaj40wzs6l0z93RHvdmy7qL8EyfF_WGPfJjlXBxxe1dV5tV5KJMHduQlsM2ohcvceCHhdmzwzChoCrpz-BPTebw"
                  referrerPolicy="no-referrer"
                />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/10 rounded-lg shadow-2xl z-50 overflow-hidden text-left"
                    >
                      <div className="py-1 select-none">
                        <button
                          onClick={() => {
                            setIsSettingsOpen(true);
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#5d5e61] hover:text-black hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            onSignOut();
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#5d5e61] hover:text-black hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-8 py-10 mx-auto w-full max-w-6xl" id="desktop-main-content-light">
          <section className="w-full">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-8" id="desktop-header-row-light">
              <h1 className="font-sans text-2xl font-bold tracking-tight uppercase select-none">
                All Rambles
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={onAddNote}
                  className="bg-black hover:opacity-95 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                  id="desktop-new-note-btn-light"
                >
                  <span>New Ramble</span>
                  <Plus className="h-4 w-4" />
                </button>

                {/* Sort Menu Options */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className={`p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
                      isSortOpen ? 'bg-[#efeeec] text-black' : 'bg-[#efeeec]/60 hover:bg-[#efeeec] text-[#5d5e61]'
                    }`}
                    id="desktop-sort-dropdown-trigger-light"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-64 bg-white border border-[#c4c7c7] rounded-xl shadow-xl z-50 overflow-hidden"
                          id="desktop-sort-dropdown-menu-light"
                        >
                          <div className="px-4 py-3 border-b border-[#c4c7c7] bg-[#f4f3f1]">
                            <span className="text-[10px] font-bold text-[#5d5e61] uppercase tracking-[0.2em] select-none">
                              Sort by:
                            </span>
                          </div>
                          <div className="p-1 select-none">
                            <button
                              onClick={() => {
                                setSortBy('latest');
                                setIsSortOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                                sortBy === 'latest' ? 'bg-[#efeeec] text-black font-semibold' : 'hover:bg-[#efeeec]/30 text-[#5d5e61]'
                              }`}
                            >
                              Latest
                            </button>
                            <button
                              onClick={() => {
                                setSortBy('title');
                                setIsSortOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                                sortBy === 'title' ? 'bg-[#efeeec] text-black font-semibold' : 'hover:bg-[#efeeec]/30 text-[#5d5e61]'
                              }`}
                            >
                              Title (A-Z)
                            </button>
                            <button
                              onClick={() => {
                                setSortBy('wordCount');
                                setIsSortOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                                sortBy === 'wordCount' ? 'bg-[#efeeec] text-black font-semibold' : 'hover:bg-[#efeeec]/30 text-[#5d5e61]'
                              }`}
                            >
                              Word Count (High to Low)
                            </button>
                            <button
                              onClick={() => {
                                setSortBy('oldest');
                                setIsSortOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                                sortBy === 'oldest' ? 'bg-[#efeeec] text-black font-semibold' : 'hover:bg-[#efeeec]/30 text-[#5d5e61]'
                              }`}
                            >
                              Oldest
                            </button>
                          </div>
                          <div className="px-4 py-4 border-t border-[#c4c7c7] flex items-center justify-between select-none bg-[#f4f3f1]">
                            <span className="text-[10px] font-bold text-[#5d5e61] uppercase tracking-[0.2em]">
                              View:
                            </span>
                            <div className="flex gap-1 bg-[#efeeec] p-0.5 rounded-lg border border-[#c4c7c7]">
                              <button
                                onClick={() => {
                                  setViewMode('grid');
                                  setIsSortOpen(false);
                                }}
                                className={`p-1.5 rounded-md transition-all ${
                                  viewMode === 'grid' ? 'text-black bg-white shadow-sm hover:bg-neutral-100' : 'text-[#5d5e61] hover:text-black'
                                }`}
                                title="Grid View"
                              >
                                <Grid2X2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setViewMode('list');
                                  setIsSortOpen(false);
                                }}
                                className={`p-1.5 rounded-md transition-all ${
                                  viewMode === 'list' ? 'text-black bg-white shadow-sm hover:bg-neutral-100' : 'text-[#5d5e61] hover:text-black'
                                }`}
                                title="List View"
                              >
                                <List className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Ramble List/Grid container */}
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 md:grid-cols-3'
                  : 'flex flex-col gap-4'
              }
            >
              <AnimatePresence mode="popLayout">
                {sortedNotes.map((note) => (
                  <motion.article
                    key={note.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-[#c4c7c7] rounded-xl p-6 flex flex-col hover:border-black transition-all group relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                    id={`note-card-desktop-${note.id}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-base font-bold text-black truncate text-ellipsis select-none pr-8 font-sans">
                        {note.title}
                      </h2>
                      <button
                        onClick={(e) => onDeleteNote(note.id, e)}
                        className="text-[#5d5e61] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 cursor-pointer p-1"
                        title="Delete Ramble"
                        id={`delete-btn-desktop-${note.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-[13px] text-[#5d5e61] leading-relaxed mb-6 flex-1 italic select-none font-serif">
                      "{note.content.length > 150 ? `${note.content.slice(0, 150)}...` : note.content}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-[#5d5e61] uppercase tracking-widest mb-4 font-bold select-none">
                      <div className="flex gap-2">
                        <span>{note.wordCount.toLocaleString()} words</span>
                        <span>{note.version}</span>
                      </div>
                      <span>{note.date}</span>
                    </div>
                    <button
                      onClick={() => onSelectNote(note)}
                      className="w-full bg-[#efeeec] hover:bg-[#e9e8e6] py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer text-black flex items-center justify-center gap-1.5"
                    >
                      <span>Continue Rambling</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.article>
                ))}
              </AnimatePresence>

              {sortedNotes.length === 0 && (
                <div className="text-center py-20 text-[#5d5e61]" id="desktop-empty-view-light">
                  <p className="text-lg">No rambles found matching "{searchQuery}"</p>
                  <button
                    onClick={onAddNote}
                    className="mt-4 text-xs font-bold uppercase text-black hover:underline cursor-pointer"
                  >
                    Create a new ramble +
                  </button>
                </div>
              )}
            </motion.div>
          </section>
        </main>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center select-none font-sans">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSettingsOpen(false)}
               className="absolute inset-0 bg-[#000000]/40 backdrop-blur-sm"
            />
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="relative w-full max-w-lg bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[350px] p-6 z-10 mx-4"
            >
              <div className="flex justify-between items-center pb-4 border-b border-black/5 mb-4">
                <h2 className="font-brand text-lg text-black tracking-[0.1em] uppercase font-bold">Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-neutral-400 hover:text-black hover:bg-neutral-100 p-1 rounded-md transition-colors text-lg font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">User Account</h3>
                  <div className="bg-neutral-50 border border-black/5 p-3 rounded-lg flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-black/10"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5BhsV1NMrog6jzCVcbTi9cdthlVYpTVNdBbXt2gSuvkrKpS1dtbrZBuxSRfp5hnnol3q_alvPToRvdN5NGe8oWUI3Pjf0sHqKAgDTtX-ofN1zaGcK83QqWJfe8Eu4_YoqZ8LWxTgDuBdELv3wa67qcsZX4Nz3PYy1Y1pVlPQXVawu5hq9g_lvaj40wzs6l0z93RHvdmy7qL8EyfF_WGPfJjlXBxxe1dV5tV5KJMHduQlsM2ohcvceCHhdmzwzChoCrpz-BPTebw"
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-semibold text-black">skyash</p>
                      <p className="text-xs text-[#5d5e61]">yashpc09@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Application Information</h3>
                  <p className="text-xs text-[#5d5e61] leading-relaxed">
                    RAMBLE is an immersive offline-first markdown recording system with companion sync features, semantic audio logs, and responsive layout interfaces.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-black/5 mt-auto flex justify-end">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 bg-black hover:bg-neutral-800 text-xs font-bold tracking-[0.1em] text-white uppercase hover:shadow transition-all rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
