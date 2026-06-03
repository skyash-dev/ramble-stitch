import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Undo, Redo, HelpCircle, PlusCircle, Settings, LogOut, 
  ChevronDown, Mic, MicOff, AlignLeft, User, Sparkles, Pin, Sun,
  Sliders, MessageSquare, BookOpen, ChevronUp, ArrowLeft
} from 'lucide-react';
import { RambleNote, Companion } from '../types';

interface EditorDarkProps {
  note: RambleNote;
  onUpdateNote: (updated: RambleNote) => void;
  onToggleTheme: () => void;
  onLogoClick: () => void;
  customCompanions: Companion[];
  onCreateCompanion: (companion: Companion) => void;
}

export default function EditorDark({
  note,
  onUpdateNote,
  onToggleTheme,
  onLogoClick,
  customCompanions,
  onCreateCompanion,
}: EditorDarkProps) {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'questions' | 'related'>('questions');

  // Input states
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Dropdown states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVersionOpen, setIsVersionOpen] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(note.version);
  const [versionsList, setVersionsList] = useState<string[]>(['v1', 'v2']);

  // Modal states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateCompanionOpen, setIsCreateCompanionOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Companion form states
  const [newCompanionName, setNewCompanionName] = useState('');
  const [newCompanionPrompt, setNewCompanionPrompt] = useState('');

  // Dictation state
  const [isDictating, setIsDictating] = useState(false);

  // Mobile drawer state
  const [isMobileDrawerExpanded, setIsMobileDrawerExpanded] = useState(false);

  // Dynamic syncing when note changes from props
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setCurrentVersion(note.version);
  }, [note]);

  // Update note model on changes
  const handleContentChange = (newVal: string) => {
    setContent(newVal);
    const wordCount = newVal.trim() === '' ? 0 : newVal.trim().split(/\s+/).length;
    onUpdateNote({
      ...note,
      content: newVal,
      wordCount,
      version: currentVersion,
      lastEdited: new Date().toISOString(),
    });
  };

  const handleTitleChange = (newVal: string) => {
    setTitle(newVal);
    onUpdateNote({
      ...note,
      title: newVal,
      lastEdited: new Date().toISOString(),
    });
  };

  const createNewVersion = () => {
    const nextVerNum = versionsList.length + 1;
    const nextVer = `v${nextVerNum}`;
    setVersionsList([...versionsList, nextVer]);
    setCurrentVersion(nextVer);
    onUpdateNote({
      ...note,
      version: nextVer,
      lastEdited: new Date().toISOString(),
    });
    setIsVersionOpen(false);
  };

  // Dictation simulation (speech-to-text typing simulator)
  const toggleDictation = () => {
    if (isDictating) {
      setIsDictating(false);
    } else {
      setIsDictating(true);
      const phrases = [
        " Outlines can limit our trajectory in unexpected ways.",
        " True creativity relies on being willing to get messy.",
        " Walking into the unknown allows genuine discoveries.",
        " That's where we find original insights."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < phrases.length) {
          setContent(prev => {
            const up = prev + phrases[i];
            handleContentChange(up);
            return up;
          });
          i++;
        } else {
          clearInterval(interval);
          setIsDictating(false);
        }
      }, 2500);
    }
  };

  const handleCompanionSubmit = () => {
    if (!newCompanionName || !newCompanionPrompt) return;
    const companion: Companion = {
      id: Math.random().toString(),
      name: newCompanionName,
      prompt: newCompanionPrompt,
      avatarColor: ['bg-purple-400/20 shadow-purple-500/20', 'bg-cyan-400/20 shadow-cyan-500/20', 'bg-emerald-400/20 shadow-emerald-500/20'][Math.floor(Math.random() * 3)],
    };
    onCreateCompanion(companion);
    setNewCompanionName('');
    setNewCompanionPrompt('');
    setIsCreateCompanionOpen(false);
  };

  return (
    <div className="bg-[#131116] text-[#e4e1e6] font-sans selection:bg-white/10 flex flex-col items-center h-screen overflow-hidden relative" id="editor-dark-container">
      
      {/* ==================== HIGH FIDELITY MOBILE EXPERIENCE (md and below) ==================== */}
      <div className="flex md:hidden flex-col h-full w-full bg-[#131316] overflow-hidden relative" id="mobile-editor-dark">
        {/* Fixed Top bar */}
        <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-6 bg-[#131316]/95 backdrop-blur-md sticky top-0 z-40">
          <button 
            onClick={onLogoClick}
            className="text-neutral-400 hover:text-white flex items-center gap-1 text-xs select-none p-1 font-bold uppercase tracking-wider"
            title="Back to Collections"
            id="mobile-editor-back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Rambles</span>
          </button>
          
          <span className="text-[12px] font-bold text-white uppercase tracking-[0.25em] max-w-[140px] truncate select-none">
            {title || 'Ramble Editor'}
          </span>

          <button 
            onClick={onToggleTheme}
            className="text-neutral-400 hover:text-white p-2 rounded-lg"
            title="Toggle Theme"
            id="mobile-editor-theme-toggle"
          >
            <Sun className="h-5 w-5" />
          </button>
        </header>

        {/* Sub-header Toolbar Panel */}
        <div className="py-2.5 px-6 border-b border-white/[0.05] bg-[#1a1a1e]/80 flex items-center justify-between z-30 select-none">
          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-white p-1"><Undo className="h-4 w-4" /></button>
            <button className="text-neutral-400 hover:text-white p-1"><Redo className="h-4 w-4" /></button>
          </div>

          <div className="flex items-center gap-3">
            {/* Version Select pill */}
            <div className="relative">
              <button 
                onClick={() => setIsVersionOpen(!isVersionOpen)}
                className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-white rounded-full flex items-center gap-1 select-none"
              >
                <span>{currentVersion}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {isVersionOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsVersionOpen(false)} />
                    <div className="absolute top-full right-0 mt-1.5 w-36 bg-[#1f1f22] border border-white/10 rounded-lg shadow-xl z-50 py-1 font-sans">
                      {versionsList.map((ver) => (
                        <div 
                          key={ver}
                          onClick={() => {
                            setCurrentVersion(ver);
                            setIsVersionOpen(false);
                          }}
                          className={`px-3 py-1.5 text-xs flex justify-between items-center ${ver === currentVersion ? 'text-white font-bold bg-white/5' : 'text-neutral-400 hover:bg-white/5'}`}
                        >
                          <span>{ver}</span>
                          {ver === currentVersion && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                        </div>
                      ))}
                      <div className="h-px bg-white/5 my-1" />
                      <button 
                        onClick={createNewVersion}
                        className="w-full text-center py-1 text-[9px] font-bold text-white uppercase hover:bg-white/10"
                      >
                        + NEW VERSION
                      </button>
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dictate toggle pill */}
            <button 
              onClick={toggleDictation}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 ${isDictating ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-neutral-400 border border-white/15'}`}
            >
              {isDictating ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
              <span>{isDictating ? 'LISTENING' : 'DICTATE'}</span>
            </button>
          </div>
        </div>

        {/* Writing Paper area - mobile optimized */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 no-scrollbar flex flex-col bg-[#131316]">
          <input 
            type="text" 
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="untitled ramble"
            className="bg-transparent border-none outline-none text-2xl font-bold font-serif text-white uppercase tracking-tight mb-4 placeholder:text-neutral-700"
          />

          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Continue rambling..."
            className="bg-transparent border-none outline-none resize-none font-serif text-base leading-[1.8] text-white/90 flex-1 focus:ring-0 min-h-[350px] no-scrollbar"
          />

          {isDictating && (
            <div className="mt-4 text-xs font-mono text-[#FFC107] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
              <span>Recording microphone output...</span>
            </div>
          )}
        </div>

        {/* Tactile Expandable Bottom Sheet (Drawer) */}
        <div 
          className={`fixed bottom-0 left-0 w-full z-40 transition-all duration-300 ease-in-out border-t border-white/[0.08] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] bg-[#1b1b1e]/95 backdrop-blur-md rounded-t-2xl ${
            isMobileDrawerExpanded ? 'h-[75vh]' : 'h-[64px]'
          }`}
          id="mobile-drawer-dark"
        >
          {/* Draggable Drag-Handle Header */}
          <div 
            onClick={() => setIsMobileDrawerExpanded(!isMobileDrawerExpanded)}
            className="h-12 w-full flex flex-col items-center justify-center cursor-pointer select-none border-b border-white/[0.04]"
          >
            <div className="w-10 h-1 bg-neutral-600 rounded-full mb-1" />
            <div className="flex items-center gap-1 text-[11px] font-semibold tracking-wider text-[#b7b4bb] uppercase">
              <span>Smart Companions</span>
              {isMobileDrawerExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
            </div>
          </div>

          {/* Drawer Body Area */}
          <div className="h-[calc(100%-48px)] flex flex-col overflow-y-auto pb-8 no-scrollbar">
            {/* Drawer Tabs Row */}
            <div className="flex border-b border-white/5 py-1 px-4 select-none">
              <button 
                onClick={() => setActiveTab('questions')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest text-center transition-all ${activeTab === 'questions' ? 'text-white border-b border-white' : 'text-neutral-500'}`}
              >
                QUESTIONS
              </button>
              <button 
                onClick={() => setActiveTab('related')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest text-center transition-all ${activeTab === 'related' ? 'text-white border-b border-white' : 'text-neutral-500'}`}
              >
                LIBRARY
              </button>
            </div>

            {/* Content Lists */}
            <div className="flex-1 p-5 overflow-y-auto no-scrollbar">
              {activeTab === 'questions' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-xs leading-relaxed">
                    <span className="block font-bold text-[#FFC107] uppercase tracking-wider mb-1">PROMPT INQUIRY</span>
                    <p className="text-white/80">"What is the ultimate bottleneck to your productivity? Is it technique or psychology?"</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-xs leading-relaxed">
                    <span className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">COMPANION COMMENT</span>
                    <p className="text-white/80">"Amateurs struggle with motivation. Professionals master identity and routine."</p>
                  </div>
                  
                  {/* Pinned Section on Mobile */}
                  <div className="pt-4 border-t border-white/5">
                    <span className="block text-[10px] font-black uppercase text-neutral-400 tracking-wider mb-2">PINNED STATEMENTS</span>
                    <div className="p-4 bg-[#FFC107]/5 border border-[#FFC107]/20 rounded-xl text-xs flex gap-2.5 items-start">
                      <Pin className="h-3 w-3 text-[#FFC107] shrink-0 mt-0.5" />
                      <p className="text-neutral-300">"Completion is a metric of professional discipline. Never hide behind endless drafts."</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <h4 className="text-xs font-bold tracking-wider text-white mb-1 uppercase flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#FFC107]" /> Turning Pro
                    </h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">The shift from amateur to expert changes how we engage our craft.</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <h4 className="text-xs font-bold tracking-wider text-white mb-1 uppercase flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-red-400" /> Do The Work
                    </h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">A manifesto for resisting complacency and finishing what we create.</p>
                  </div>
                </div>
              )}

              {/* Custom companions list in drawer bottom */}
              <div className="mt-8 pt-4 border-t border-white/5 select-none text-center">
                <span className="block text-[10px] font-black uppercase text-neutral-400 tracking-wider mb-4">ACTIVE PERSONAS</span>
                <div className="flex gap-3 justify-center items-center flex-wrap">
                  {customCompanions.map((comp) => (
                    <div 
                      key={comp.id}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 shrink-0 ${comp.avatarColor}`}
                      title={`${comp.name}: ${comp.prompt}`}
                    >
                      <span className="text-[10px] font-bold text-white uppercase select-none">{comp.name.slice(0, 2)}</span>
                    </div>
                  ))}
                  <button 
                    onClick={() => setIsCreateCompanionOpen(true)}
                    className="w-10 h-10 border border-neutral-600 rounded-full flex items-center justify-center text-neutral-400 hover:text-white"
                    title="Add Companion"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SCREEN 2: HIGH FIDELITY DESKTOP WORKSPACE (md and up) ==================== */}
      <div className="hidden md:flex flex-col h-full w-full bg-[#131316]" id="desktop-editor-dark">
        {/* Header wrapper for max-width */}
        <div className="w-full border-b border-white/5 sticky top-0 z-40 bg-[#131316]">
          <header className="max-w-[1366px] mx-auto flex justify-between items-center px-10 h-16 relative">
            <div className="flex items-center gap-10">
              <span 
                onClick={onLogoClick}
                className="font-brand text-[22px] text-white cursor-pointer font-semibold tracking-wider select-none uppercase"
              >
                &nbsp;RAMBLE.
              </span>
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
              <span className="text-[14px] font-medium text-white uppercase tracking-[0.2em]">
                {title || 'Untitled Document'}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-[#c8c5cb] cursor-pointer hover:text-white transition-colors p-1"
                title="Toggle Sidebar"
              >
                <AlignLeft className="h-5 w-5" />
              </button>
              
              <button 
                onClick={onToggleTheme}
                className="text-[#c8c5cb] cursor-pointer hover:text-white transition-colors p-1" 
                title="Toggle Theme"
              >
                <Sun className="h-5 w-5" />
              </button>

              {/* Profile Dropdown Container */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="focus:outline-none cursor-pointer"
                  id="profile-btn"
                >
                  <img 
                    alt="skyash profile" 
                    className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-white/10 hover:ring-white/30 transition-all select-none" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt0_JecLERDHbCgLftCV8sUhAwohPNaTbjE2GGK1SXlD-bT0I9_zNeRhw34zc_EDCuWbl9LlHzk0uVq75dVgP_cf05DkNbHYbQJ6gmC3tKN1JOU5QaZCd7aLFw67MkqVeo2T66bDTxtX61eXFqadFkLxzPt4SNiZ9Ui7tq26Em6I5bal-ENzrTWUGD__B-vsLSoXaURNewegmjO6XwEPfU7GW9NuyBWZsnVA5Vrv8Rs2YfaZFzY7mxFImW2tcnnR_9KwcoSq3sAm4"
                    referrerPolicy="no-referrer"
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[#1f1f22] border border-white/10 rounded-lg shadow-2xl z-[70] overflow-hidden"
                    >
                      <div className="py-1 select-none">
                        <button 
                          onClick={() => setIsSettingsOpen(true)}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#c8c5cb] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <button 
                          onClick={onLogoClick}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#c8c5cb] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer font-sans"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>
        </div>

        {/* Main Content Area Wrapper */}
        <div className="max-w-[1366px] w-full bg-[#131316] h-[calc(100vh-64px)] overflow-hidden">
          <main className="flex w-full h-full">
            
            {/* Editor Core */}
            <div className="flex-1 writing-canvas flex flex-col items-center px-10 py-8 bg-[#131316] overflow-y-auto h-full class-scrollbar no-scrollbar">
              <div className="w-full flex flex-col max-w-[900px]">
                
                {/* Control Panel Toolbar */}
                <div className="editor-sheet border-b border-white/5 px-8 py-4 flex items-center justify-between gap-8 rounded-t-lg bg-[#0e0e11] text-[#c8c5cb] paper-texture select-none z-10">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                      <button className="hover:text-white transition-colors cursor-pointer"><Undo className="h-4 w-4" /></button>
                      <button className="hover:text-white transition-colors cursor-pointer"><Redo className="h-4 w-4" /></button>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-sans">
                      <button className="flex items-center gap-1 hover:text-white transition-colors tracking-wider font-semibold">
                        H <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <button className="hover:text-white transition-colors cursor-pointer text-xs font-bold font-sans uppercase">BOLD</button>
                    </div>
                  </div>

                  {/* Dropdown Version Control */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div 
                        onClick={() => setIsVersionOpen(!isVersionOpen)}
                        className="px-3 py-1.5 text-[12px] font-bold text-white font-sans flex items-center gap-1.5 rounded-md cursor-pointer border border-transparent hover:border-white/20 transition-colors bg-[#1f1f22]"
                      >
                        <span className="font-semibold">{currentVersion}</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>

                      <AnimatePresence>
                        {isVersionOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setIsVersionOpen(false)} />
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute top-full left-0 mt-2 w-44 bg-[#1f1f22] border border-white/10 rounded-md shadow-xl z-40 py-1 flex flex-col overflow-hidden"
                            >
                              {versionsList.map((ver) => (
                                <div 
                                  key={ver}
                                  onClick={() => {
                                    setCurrentVersion(ver);
                                    setIsVersionOpen(false);
                                  }}
                                  className={`px-4 py-2 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors text-sm ${
                                    ver === currentVersion ? 'text-white font-semibold' : 'text-neutral-400'
                                  }`}
                                >
                                  <span>{ver}</span>
                                  {ver === currentVersion && <span className="h-1.5 w-1.5 bg-white rounded-full" />}
                                </div>
                              ))}
                              <div className="h-px bg-white/5 my-1" />
                              <button 
                                onClick={createNewVersion}
                                className="mx-2 my-1 px-3 py-1.5 flex items-center justify-center gap-1 border border-white/15 hover:border-white/30 text-[10px] font-bold tracking-[0.1em] text-white uppercase font-sans transition-all rounded-md cursor-pointer bg-[#0e0e11]"
                              >
                                New Version
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dictation Toggle Button */}
                    <button 
                      onClick={toggleDictation}
                      className={`px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase active:scale-95 transition-all flex items-center gap-1.5 font-sans rounded-md cursor-pointer ${
                        isDictating 
                          ? 'bg-[#C62828] text-white animate-pulse' 
                          : 'bg-[#1f1f22] text-[#c4c7c8] hover:text-white'
                      }`}
                    >
                      {isDictating ? <Mic className="h-3.5 w-3.5 animate-bounce" /> : <MicOff className="h-3.5 w-3.5" />}
                      <span>DICTATE</span>
                    </button>
                  </div>
                </div>

                {/* Writing Sheet */}
                <div className="editor-sheet min-h-[580px] shadow-2xl pt-8 pb-16 relative px-12 md:px-20 rounded-b-lg bg-[#0e0e11] text-[#e4e1e6] paper-texture flex flex-col gap-6">
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="untitled ramble"
                    className="bg-transparent border-b border-transparent focus:border-white/10 outline-none text-2xl font-semibold text-white tracking-tight py-1 font-serif uppercase uppercase-input"
                  />

                  <textarea
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Continue rambling..."
                    className="bg-transparent border-none outline-none resize-none font-serif text-lg leading-[2] text-white/90 tracking-wide flex-1 focus:ring-0 focus:outline-none min-h-[400px]"
                    style={{ letterSpacing: '0.015em' }}
                  />

                  {isDictating && (
                    <div className="text-xs font-mono text-[#FFC107] flex items-center gap-2 select-none">
                      <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
                      <span>Listening & transcribing spoken thoughts...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Collapsible Sidebar Component */}
            {isSidebarOpen && (
              <aside className="w-[316px] flex h-full border-l border-white/5 bg-[#131316]">
                <div className="flex-1 flex flex-col rounded-xl m-4 border border-white/[0.03] bg-[#0e0e11]/50 overflow-hidden">
                  {/* Related Library Screen View */}
                  {activeTab === 'related' ? (
                    <div className="flex-1 flex flex-col h-full opacity-95">
                      <div className="flex items-center justify-center border-b h-12 border-white/5 bg-white/[0.02]">
                        <span className="text-xs font-serif italic uppercase text-neutral-400 font-semibold tracking-widest">
                          Library
                        </span>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                        <div className="group cursor-pointer hover:bg-white/[0.01] p-3 rounded-lg border border-transparent hover:border-white/5 transition-all">
                          <h4 className="text-[13px] text-white mb-1 font-medium font-serif flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#FFC107]" /> Turning Pro
                          </h4>
                          <p className="text-[11px] text-[#c8c5cb]/70 line-clamp-2">The transition from amateur to professional is a mental shift that changes everything.</p>
                        </div>
                        <div className="group cursor-pointer hover:bg-white/[0.01] p-3 rounded-lg border border-transparent hover:border-white/5 transition-all">
                          <h4 className="text-[13px] text-white mb-1 font-medium font-serif flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#C62828]" /> Do The Work
                          </h4>
                          <p className="text-[11px] text-[#c8c5cb]/70 line-clamp-2">A manifesto for finishing what you start and overcoming the resistance.</p>
                        </div>
                        <div className="group cursor-pointer hover:bg-white/[0.01] p-3 rounded-lg border border-transparent hover:border-white/5 transition-all">
                          <h4 className="text-[13px] text-white mb-1 font-medium font-serif flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-blue-400" /> The Artist's Way
                          </h4>
                          <p className="text-[11px] text-[#c8c5cb]/70 line-clamp-2">Spiritual path to higher creativity through morning pages and artist dates.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard Mode: Questions & Pinned list */
                    <div className="flex-1 flex flex-col h-full">
                      {/* Questions Section */}
                      <div className="flex-1 flex flex-col overflow-hidden border-b border-white/[0.03]">
                        <div className="flex items-center justify-center border-b h-12 border-white/5 bg-white/[0.02]">
                          <span className="text-xs font-serif italic text-neutral-400 font-semibold tracking-widest uppercase">
                            Questions
                          </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 select-none no-scrollbar">
                          <div className="bg-white/[0.02] border border-white/5 rounded-md p-3 text-xs leading-relaxed text-neutral-400">
                            <p className="font-semibold text-white/90 mb-1">Q: What is Resistance?</p>
                            <p>It's an internal repelling force. How does it manifest in your current project?</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/5 rounded-md p-3 text-xs leading-relaxed text-neutral-400">
                            <p className="font-semibold text-white/90 mb-1">Q: How to turn professional?</p>
                            <p>Amateurs take failures personally. Professionals show up every day.</p>
                          </div>
                        </div>
                      </div>

                      {/* Pinned Section */}
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex items-center justify-center border-b border-white/5 h-12 bg-white/[0.02]">
                          <span className="text-xs font-serif italic text-neutral-400 font-semibold tracking-widest uppercase">
                            Pinned thoughts
                          </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 select-none no-scrollbar">
                          <div className="bg-[#FFC107]/5 border border-[#FFC107]/25 rounded-md p-3 text-xs leading-relaxed text-neutral-300 relative group/pin">
                            <Pin className="h-3 w-3 absolute top-2 right-2 text-[#FFC107]" />
                            <p>"Finished is better than perfect. Show up regardless of how you feel."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}

            {/* Far Right Gutter - level 2 status bar */}
            <div className="w-16 border-l border-white/5 flex flex-col items-center py-6 bg-[#131316] gap-2 h-full z-10 select-none">
              <div className="flex flex-col gap-4 mb-4">
                {/* Yellow Wax Seal */}
                <button 
                  onClick={() => {
                    setActiveTab('questions');
                    setIsSidebarOpen(true);
                  }}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${activeTab === 'questions' && isSidebarOpen ? 'border-white/20 bg-white/5 shadow-md scale-105' : 'border-transparent hover:bg-white/5'}`}
                  title="Questions & Pins"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FFC107] border-2 border-white wax-seal" />
                </button>

                {/* Red Wax Seal */}
                <button 
                  onClick={() => {
                    setActiveTab('related');
                    setIsSidebarOpen(true);
                  }}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${activeTab === 'related' && isSidebarOpen ? 'border-white/20 bg-white/5 shadow-md scale-105' : 'border-transparent hover:bg-white/5'}`}
                  title="Related writings"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C62828] border-2 border-white wax-seal" />
                </button>
              </div>

              <div className="w-6 h-px bg-white/10" />

              {/* Custom Companion Circles */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-48 py-1 no-scrollbar">
                {customCompanions.map((comp) => (
                  <div 
                    key={comp.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all mb-1 ${comp.avatarColor}`}
                    title={`${comp.name}: ${comp.prompt}`}
                  >
                    <span className="text-[10px] font-bold text-white uppercase select-none">{comp.name.slice(0, 2)}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <button 
                onClick={() => setIsCreateCompanionOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer mt-1"
                title="Create new companion"
              >
                <PlusCircle className="h-6 w-6" />
              </button>

              <button 
                onClick={() => setIsInfoOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer mt-auto"
                title="What are companions?"
              >
                <HelpCircle className="h-6 w-6" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* ==================== COMMON OVERLAYS / DIALOGS ==================== */}

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center select-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-[#000000]/70 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#131316] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex h-[500px]"
            >
              <div className="w-56 border-r border-white/5 bg-[#0e0e11] flex flex-col p-6">
                <h2 className="font-brand text-lg text-white tracking-[0.1em] uppercase mb-6">Settings</h2>
                <nav className="flex-1 space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded text-xs font-semibold bg-white/5 text-white border-l-2 border-white">
                    Account
                  </button>
                </nav>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="mt-auto px-4 py-2 border border-white/10 text-[10px] font-bold tracking-[0.1em] text-white uppercase hover:bg-white/5 cursor-pointer rounded"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 p-10 bg-[#0e0e11] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-8">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Profile Security Mode</p>
                        <p className="text-xs text-neutral-400">Keep rambles encrypted and local-first</p>
                      </div>
                      <div className="w-10 h-5 bg-white/20 rounded-full relative cursor-pointer p-0.5">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Info Companion Modal */}
      <AnimatePresence>
        {isInfoOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoOpen(false)}
              className="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#131316] border border-white/10 rounded-xl shadow-2xl p-8 font-serif"
            >
              <h2 className="font-brand text-[20px] text-white tracking-[0.1em] uppercase mb-6">What are Companions?</h2>
              <div className="text-[15px] leading-relaxed text-neutral-200 space-y-4">
                <p>A Companion is a mini-assistant inside <strong>RAMBLE</strong>. It reviews your textual trajectory and responds with guiding prompts or questions.</p>
                <p>By default, you have companion layers like <span className="font-bold text-[#FFC107]">Questions</span> and <span className="font-bold text-[#C62828]">Library</span>.</p>
              </div>
              <div className="mt-8 flex justify-end font-sans">
                <button 
                  onClick={() => setIsInfoOpen(false)}
                  className="px-6 py-2 bg-white text-black text-xs font-bold tracking-[0.15em] uppercase hover:bg-neutral-200 transition-colors rounded cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Companion Modal */}
      <AnimatePresence>
        {isCreateCompanionOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateCompanionOpen(false)}
              className="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#131316] border border-white/10 rounded-xl shadow-2xl p-6"
            >
              <h2 className="text-[18px] font-bold text-white mb-6 uppercase">Create Companion</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-neutral-400">Name</label>
                  <input 
                    type="text" 
                    value={newCompanionName}
                    onChange={(e) => setNewCompanionName(e.target.value)}
                    placeholder="e.g. Debate Coach"
                    className="w-full bg-[#1b1b1e] border border-white/5 text-white rounded-lg px-4 py-2 text-sm outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-neutral-400">Prompt / Directions</label>
                  <textarea 
                    value={newCompanionPrompt}
                    onChange={(e) => setNewCompanionPrompt(e.target.value)}
                    placeholder="Describe how the companion acts..."
                    rows={4}
                    className="w-full bg-[#1b1b1e] border border-white/5 text-white rounded-lg px-4 py-2 text-sm resize-none outline-none"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  onClick={() => setIsCreateCompanionOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleCompanionSubmit}
                  className="px-6 py-2 bg-white text-black text-xs font-bold rounded-md hover:bg-neutral-200"
                >
                  CREATE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
