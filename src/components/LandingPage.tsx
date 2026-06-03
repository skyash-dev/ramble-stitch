import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (purpose: 'hero-cta' | 'footer-cta') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative h-screen text-[#1a1c1c] font-serif overflow-y-auto selection:bg-black/10">
      {/* Animated Mesh Background */}
      <div className="mesh-gradient fixed inset-0 pointer-events-none" />

      <main className="max-w-4xl mx-auto pt-32 pb-48 px-6 text-center relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32 relative"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-black/5 blur-[120px] rounded-full pointer-events-none" />
          
          <h1 className="font-brand text-8xl tracking-[-0.05em] mb-16 text-black opacity-90 font-semibold select-none">
            RAMBLE.
          </h1>
          
          <div className="space-y-4 mb-12">
            <p className="strikethrough text-xl font-sans tracking-widest text-black/40 font-light uppercase select-none">
              not another writing app
            </p>
            <h2 className="text-5xl font-light italic text-black/90 tracking-tight select-none">
              it’s a rambling app
            </h2>
          </div>

          <div className="space-y-3 mb-20 text-xl font-light tracking-wide text-black/60 max-w-xl mx-auto select-none font-sans">
            <p>A space where you can find your own answers.</p>
            <p>Celebrate the messy, beautiful process of ideation.</p>
          </div>

          <button
            onClick={() => onNavigate('hero-cta')}
            data-purpose="hero-cta"
            className="glass-card rounded-xl py-6 font-brand text-lg tracking-[0.3em] glow-hover uppercase text-black/90 font-semibold px-24 opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            Ramble
          </button>
        </motion.header>

        {/* Feature Grid */}
        <section className="mt-48 space-y-48 text-left max-w-3xl mx-auto">
          {/* Feature 1: Thinking Partner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-20"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="glass-card rounded-xl w-32 h-32 flex items-center justify-center floating">
                <div className="w-12 h-12 rounded-full bg-[#FFC107] blur-[1px] shadow-[0_0_30px_rgba(255,193,7,0.4)]" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-light font-sans tracking-tight text-black">a thinking partner.</h3>
              <p className="text-black/55 leading-relaxed font-sans font-light text-lg">
                ramble uses AI to ask the right questions, helping you discover your own best ideas.
              </p>
            </div>
          </motion.div>

          {/* Feature 2: Think Out Loud */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row-reverse items-center justify-between gap-20"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="glass-card rounded-xl px-8 py-5 flex items-center gap-4 floating" style={{ animationDelay: '-2s' }}>
                <span className="text-xs font-brand tracking-[0.4em] uppercase text-black/80">DICTATE</span>
                <div className="w-px h-4 bg-black/10" />
                <Play className="w-4 h-4 text-black/40 fill-black/10" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-right md:text-left">
              <h3 className="text-3xl font-light font-sans tracking-tight text-black">think out loud.</h3>
              <p className="text-black/55 leading-relaxed font-sans font-light text-lg">
                Just start talking. ramble.page listens, transcribes in real-time, and organizes your spoken words.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Never Lose a Thought */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-20"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative scale-110 floating" style={{ animationDelay: '-1s' }}>
                <div className="glass-card rounded-xl p-6 w-40">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-black/30 mb-4 font-sans font-bold">Versions</div>
                  <div className="text-[11px] py-1.5 border-b border-black/5 font-sans text-black/40 font-light/30">v1</div>
                  <div className="text-[11px] py-1.5 font-medium font-sans text-black/90">v2</div>
                </div>
                <div className="absolute -top-6 -right-12 flex gap-2">
                  <div className="glass-card rounded-xl bg-black/5 text-[9px] px-3 py-1.5 font-sans text-black/70">v2</div>
                  <div className="glass-card rounded-xl bg-black/5 text-[9px] px-3 py-1.5 font-sans text-black/70">New Version</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-light font-sans tracking-tight text-black">never lose a thought.</h3>
              <p className="text-black/55 leading-relaxed font-sans font-light text-lg">
                Explore a new tangent by creating a version. You can always track down your thoughts and look at the process.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Companions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row-reverse items-center justify-between gap-20"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-yellow-400/20 blur-[2px] border border-yellow-400/30 shadow-[0_0_10px_rgba(250,204,21,0.2)]" />
                <div className="w-6 h-6 rounded-full bg-pink-400/20 blur-[2px] border border-pink-400/30 shadow-[0_0_10px_rgba(244,114,182,0.2)]" />
                <div className="w-6 h-6 rounded-full bg-blue-400/20 blur-[2px] border border-blue-400/30 shadow-[0_0_10px_rgba(96,165,250,0.2)]" />
                <div className="w-6 h-6 rounded-full bg-green-400/20 blur-[2px] border border-green-400/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-right md:text-left">
              <h3 className="text-3xl font-light font-sans tracking-tight text-black">companions.</h3>
              <p className="text-black/55 leading-relaxed font-sans font-light text-lg">
                LLMs tied to your ramble. they read your writing, run custom prompts, and bring results back in real time.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Philosophy */}
        <section className="mt-64 mb-32 max-w-2xl mx-auto relative text-center">
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-black/5 blur-[100px] rounded-full pointer-events-none" />
          <h3 className="text-4xl font-light font-sans mb-12 text-black tracking-tight select-none">our philosophy.</h3>
          <div className="text-black/40 space-y-4 text-xl font-light italic leading-relaxed select-none">
            <p>We believe the best ideas are already inside you.</p>
            <p>Our goal is not to give you answers, but to provide a space</p>
            <p>where you can find your own.</p>
          </div>
          <div className="mt-24">
            <button
              onClick={() => onNavigate('footer-cta')}
              data-purpose="footer-cta"
              className="glass-card rounded-xl py-6 font-brand text-lg tracking-[0.3em] glow-hover uppercase text-black/90 font-semibold px-24 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              Ramble
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
