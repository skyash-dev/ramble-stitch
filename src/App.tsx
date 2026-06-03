import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LandingPage from './components/LandingPage';
import HomeDark from './components/HomeDark';
import HomeLight from './components/HomeLight';
import EditorDark from './components/EditorDark';
import EditorLight from './components/EditorLight';
import { RambleNote, ScreenType, Companion } from './types';

// Mock high-fidelity notes matching the design specs
const INITIAL_NOTES: RambleNote[] = [
  {
    id: '1',
    title: 'The War of Art',
    content: `Resistance is the most dangerous force on the planet. It is the root of more unhappiness than poverty, disease, and erectile dysfunction. To yield to Resistance deforms our spirit. It stunts us and makes us less than we are and were born to be.\n\nMost of us have two lives. The life we live, and the unlived life within us. Between the two stands Resistance. It is a repelling force. It is negative. Its aim is to shove us away, distract us, prevent us from doing our work.\n\nThe professional loves her work. She is invested in it. But she does not forget that the work is not her. The amateur takes it personally. The professional has learned that better is the enemy of good and that finished is better than perfect. She shows up every day, regardless of how she feels.`,
    wordCount: 1540,
    version: 'v2',
    date: 'Oct 12, 2023',
    lastEdited: '2023-10-12T14:32:00.000Z',
  },
  {
    id: '2',
    title: 'Cognitive Load Theory',
    content: "The fundamental principle of instructional design should be to minimize extraneous cognitive load while maximizing the learner's resources for schema acquisition. Extraneous cognitive load is caused by bad presentation layouts and useless decorative elements that consume working memory bandwidth without serving semantic value.",
    wordCount: 850,
    version: 'v1',
    date: 'Oct 10, 2023',
    lastEdited: '2023-10-10T11:15:00.000Z',
  },
  {
    id: '3',
    title: 'Architecture of Loneliness',
    content: "Modern cities are designed for movement, not for static connection. We built roads to leave, but we forgot to build spaces to rest. Highways sever communities, commercial grids discourage ambient conversations, and single-family dwellings confine citizens into highly privatized, singular units.",
    wordCount: 2100,
    version: 'v3',
    date: 'Oct 08, 2023',
    lastEdited: '2023-10-08T09:20:00.000Z',
  },
  {
    id: '4',
    title: 'Minimalist UI Patterns',
    content: "Whitespace is not 'nothing'. It is a structural element that defines the relationship between things. Generous padding isolates core components, clear hierarchical structures guide visual tracking, and a restricted tonal palette lowers the overhead of processing information.",
    wordCount: 1670,
    version: 'v2',
    date: 'Sep 25, 2023',
    lastEdited: '2023-09-25T16:45:00.000Z',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('ramble-landing-page');
  const [transitionType, setTransitionType] = useState<'push' | 'push_back' | 'slide_up' | 'none'>('push');
  
  // High fidelity notes list state
  const [notes, setNotes] = useState<RambleNote[]>(INITIAL_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string>('1');

  // Custom companions list state
  const [customCompanions, setCustomCompanions] = useState<Companion[]>([]);

  // Navigation controller ensuring navigation matching spec rules
  const navigateTo = (target: ScreenType, transition: 'push' | 'push_back' | 'slide_up' | 'none') => {
    setTransitionType(transition);
    setCurrentScreen(target);
  };

  // Select note handler
  const activeNote = notes.find((note) => note.id === selectedNoteId) || notes[0];

  const handleSelectNote = (note: RambleNote, targetScreen: 'ramble-editor-dark' | 'ramble-editor-light') => {
    setSelectedNoteId(note.id);
    navigateTo(targetScreen, 'push');
  };

  // Delete note handler
  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Add note handler
  const handleAddNote = (targetScreen: 'ramble-editor-dark' | 'ramble-editor-light') => {
    const newId = Math.random().toString();
    const newNote: RambleNote = {
      id: newId,
      title: 'Untitled Ramble',
      content: '',
      wordCount: 0,
      version: 'v1',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      lastEdited: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newId);
    navigateTo(targetScreen, 'slide_up');
  };

  // Edit/update note fields handler
  const handleUpdateNote = (updated: RambleNote) => {
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
  };

  // Mount Companions list
  const handleCreateCompanion = (companion: Companion) => {
    setCustomCompanions([companion, ...customCompanions]);
  };

  // Transition variants mapping
  const getVariants = () => {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  };

  const getTransition = () => {
    return { duration: 0.15, ease: 'easeOut' };
  };

  const variants = getVariants();
  const transition = getTransition();

  return (
    <div className="w-full h-screen bg-[#faf9f7] overflow-hidden relative font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={transition}
          className="w-full h-full overflow-hidden"
        >
          {currentScreen === 'ramble-landing-page' && (
            <LandingPage
              onNavigate={(purpose) => {
                if (purpose === 'hero-cta') {
                  navigateTo('ramble-home-light', 'push');
                } else if (purpose === 'footer-cta') {
                  navigateTo('ramble-home-dark', 'push');
                }
              }}
            />
          )}

          {currentScreen === 'ramble-home-dark' && (
            <HomeDark
              notes={notes}
              onDeleteNote={handleDeleteNote}
              onAddNote={() => handleAddNote('ramble-editor-dark')}
              onSelectNote={(note) => handleSelectNote(note, 'ramble-editor-dark')}
              onToggleTheme={() => navigateTo('ramble-home-light', 'none')}
              onLogoClick={() => navigateTo('ramble-landing-page', 'push_back')}
            />
          )}

          {currentScreen === 'ramble-home-light' && (
            <HomeLight
              notes={notes}
              onDeleteNote={handleDeleteNote}
              onAddNote={() => handleAddNote('ramble-editor-light')}
              onSelectNote={(note) => handleSelectNote(note, 'ramble-editor-light')}
              onToggleTheme={() => navigateTo('ramble-home-dark', 'none')}
              onLogoClick={() => navigateTo('ramble-landing-page', 'push_back')}
              onProfileClick={() => navigateTo('ramble-editor-dark', 'none')}
            />
          )}

          {currentScreen === 'ramble-editor-dark' && (
            <EditorDark
              note={activeNote}
              onUpdateNote={handleUpdateNote}
              onToggleTheme={() => navigateTo('ramble-editor-light', 'none')}
              onLogoClick={() => navigateTo('ramble-home-dark', 'push_back')}
              customCompanions={customCompanions}
              onCreateCompanion={handleCreateCompanion}
            />
          )}

          {currentScreen === 'ramble-editor-light' && (
            <EditorLight
              note={activeNote}
              onUpdateNote={handleUpdateNote}
              onToggleTheme={() => navigateTo('ramble-editor-dark', 'none')}
              onLogoClick={() => navigateTo('ramble-home-light', 'push_back')}
              customCompanions={customCompanions}
              onCreateCompanion={handleCreateCompanion}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
