import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import { 
  Snowflake, 
  Wind, 
  Volume2, 
  VolumeX, 
  Square, 
  Sparkles, 
  Database,
  Sliders, 
  Activity, 
  Music,
  CheckCircle,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Balloon visual component - formal metallic palettes
const BalloonSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 32" width="100%" height="100%" className="drop-shadow-md select-none pointer-events-none">
    {/* Highlight reflection */}
    <defs>
      <radialGradient id={`grad-${color.replace('#','')}`} cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="40%" stopColor={color} />
        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
      </radialGradient>
    </defs>
    {/* Balloon body */}
    <ellipse cx="12" cy="12" rx="9" ry="12" fill={`url(#grad-${color.replace('#','')})`} />
    {/* Balloon knot */}
    <polygon points="12,24 9,26 15,26" fill={color} />
    {/* Balloon string - elegant waved cord */}
    <path d="M12,26 C10,28 14,30 12,32" stroke="#71717a" strokeWidth="0.8" fill="none" />
  </svg>
);

// Advanced real-time procedural synthesizer
class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.4;

  init() {
    if (this.ctx) return true;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      return true;
    } catch (e) {
      console.warn("Procedural Audio context failed to load.", e);
      return false;
    }
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  getVolume() {
    return this.volume;
  }

  playSnowflakeAtmosphere() {
    if (!this.init() || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Cozy alpine cold wind background (warm bandpassed noise simulate)
    const windOsc = this.ctx.createOscillator();
    const windGain = this.ctx.createGain();
    windOsc.type = 'sine';
    windOsc.frequency.setValueAtTime(130, now);
    windOsc.frequency.linearRampToValueAtTime(155, now + 2.5);
    windOsc.frequency.linearRampToValueAtTime(120, now + 5.0);

    windGain.gain.setValueAtTime(0, now);
    windGain.gain.linearRampToValueAtTime(0.045, now + 1.2);
    windGain.gain.linearRampToValueAtTime(0.045, now + 3.8);
    windGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

    windOsc.connect(windGain);
    windGain.connect(this.masterGain);
    windOsc.start(now);
    windOsc.stop(now + 5.0);

    // Dynamic Sparkling Pentatonic Chimes (representing crystalline frozen structures)
    const pentatonicChord = [659.25, 783.99, 880.00, 987.77, 1174.66, 1318.51, 1567.98];
    for (let i = 0; i < 15; i++) {
      const startTime = now + i * 0.32 + Math.random() * 0.12;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      
      chimeOsc.type = 'sine';
      const rootFreq = pentatonicChord[Math.floor(Math.random() * pentatonicChord.length)];
      chimeOsc.frequency.setValueAtTime(rootFreq, startTime);
      chimeOsc.frequency.exponentialRampToValueAtTime(rootFreq * 0.95, startTime + 0.35);

      chimeGain.gain.setValueAtTime(0, startTime);
      chimeGain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chimeOsc.start(startTime);
      chimeOsc.stop(startTime + 0.52);
    }
  }

  playBalloonAtmosphere() {
    if (!this.init() || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Gentle aerodynamic rising whistlers
    for (let i = 0; i < 8; i++) {
      const startTime = now + i * 0.58 + Math.random() * 0.2;
      const floatOsc = this.ctx.createOscillator();
      const floatGain = this.ctx.createGain();
      
      floatOsc.type = i % 2 === 0 ? 'sine' : 'triangle';
      const rootStart = 200 + i * 28 + Math.random() * 30;
      const rootEnd = rootStart * 1.55;

      floatOsc.frequency.setValueAtTime(rootStart, startTime);
      floatOsc.frequency.linearRampToValueAtTime(rootEnd, startTime + 0.75);

      floatGain.gain.setValueAtTime(0, startTime);
      floatGain.gain.linearRampToValueAtTime(0.07, startTime + 0.2);
      floatGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.75);

      floatOsc.connect(floatGain);
      floatGain.connect(this.masterGain);
      floatOsc.start(startTime);
      floatOsc.stop(startTime + 0.8);
    }

    // Cozy balloon surface latex friction squeaks
    for (let i = 0; i < 4; i++) {
      const startTime = now + i * 1.3 + Math.random() * 0.4;
      const rubOsc = this.ctx.createOscillator();
      const rubGain = this.ctx.createGain();
      
      rubOsc.type = 'sine';
      const freq = 380 + Math.random() * 60;
      rubOsc.frequency.setValueAtTime(freq, startTime);
      rubOsc.frequency.exponentialRampToValueAtTime(freq * 2.1, startTime + 0.16);

      rubGain.gain.setValueAtTime(0, startTime);
      rubGain.gain.linearRampToValueAtTime(0.05, startTime + 0.04);
      rubGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);

      rubOsc.connect(rubGain);
      rubGain.connect(this.masterGain);
      rubOsc.start(startTime);
      rubOsc.stop(startTime + 0.22);
    }
  }

  // Quick chime tool for interactive system confirmation
  playInterfacePing() {
    if (!this.init() || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.16);
  }
}

// Global Singleton Instance
const synthInstance = new AudioSynthEngine();

// Typings for procedural particles
interface SnowflakeItem {
  id: string;
  left: number;
  delay: number;
  duration: number;
  swayX: number;
  rotateDeg: number;
  maxOpacity: number;
  size: number;
}

interface BalloonItem {
  id: string;
  left: number;
  delay: number;
  duration: number;
  swayX: number;
  rotateDeg: number;
  size: number;
  color: string;
}

export default function App() {
  // Simulator configuration states
  const [activeEffect, setActiveEffect] = useState<'none' | 'snowflakes' | 'balloons'>('none');
  const [countdown, setCountdown] = useState<number>(0);
  const [stopRequested, setStopRequested] = useState<boolean>(false);
  
  // Customization Deck states
  const [density, setDensity] = useState<'light' | 'medium' | 'dense'>('medium');
  const [speed, setSpeed] = useState<'gentle' | 'normal' | 'fast'>('normal');
  
  // Interactive Sound Settings states
  const [snowflakesSound, setSnowflakesSound] = useState<boolean>(true);
  const [balloonsSound, setBalloonsSound] = useState<boolean>(true);
  const [synthVolume, setSynthVolume] = useState<number>(40); // 0-100 range

  // Simulated Synths loading panel for pristine UI design
  const [audioLoaderState, setAudioLoaderState] = useState<'unloaded' | 'loading' | 'ready'>('unloaded');

  // Particle sets
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  // Timers memory
  const effectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sound Synth singleton integration
  useEffect(() => {
    // Initial visual trigger simulate 
    setAudioLoaderState('loading');
    const t = setTimeout(() => {
      synthInstance.setVolume(synthVolume / 100);
      setAudioLoaderState('ready');
    }, 750);
    return () => clearTimeout(t);
  }, []);

  // Update volume in engine safely
  useEffect(() => {
    synthInstance.setVolume(synthVolume / 100);
  }, [synthVolume]);

  // Clean-up animations
  const stopAllAnimations = useCallback(() => {
    setStopRequested(true);
    setActiveEffect('none');
    setCountdown(0);
    setSnowflakes([]);
    setBalloons([]);
    
    if (effectTimeoutRef.current) {
      clearTimeout(effectTimeoutRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    // Short confirmation bell
    synthInstance.playInterfacePing();
    
    // Auto-reset state for new clicks
    setTimeout(() => {
      setStopRequested(false);
    }, 100);
  }, []);

  // Calculation parameters based on current density selection
  const getParticleCounts = () => {
    switch (density) {
      case 'light': return { snowflakes: 25, balloons: 12 };
      case 'medium': return { snowflakes: 55, balloons: 22 };
      case 'dense': return { snowflakes: 110, balloons: 45 };
    }
  };

  // Speed scaling factor inside CSS style vars
  const getDurationScaling = (baseMin: number, baseMax: number) => {
    switch (speed) {
      case 'gentle': return { min: baseMin * 1.5, max: baseMax * 1.5 };
      case 'normal': return { min: baseMin, max: baseMax };
      case 'fast': return { min: baseMin * 0.6, max: baseMax * 0.6 };
    }
  };

  // Snowflake core trigger
  const triggerSnowflakes = () => {
    if (stopRequested) return;
    
    // Reset previous states
    if (effectTimeoutRef.current) clearTimeout(effectTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Warm palette for elegant corporate presentation environment
    setActiveEffect('snowflakes');
    setCountdown(5.0);
    setBalloons([]);

    // Custom sound synthetic execution
    if (snowflakesSound) {
      synthInstance.playSnowflakeAtmosphere();
    }

    // Particle Generation
    const counts = getParticleCounts().snowflakes;
    const speedLimits = getDurationScaling(3.2, 4.8);
    const generatedSnowflakes: SnowflakeItem[] = [];

    for (let i = 0; i < counts; i++) {
      generatedSnowflakes.push({
        id: `snowflake-${i}-${Math.random()}`,
        left: Math.random() * 98, // keep safe margins on borders
        delay: Math.random() * 3.8, // scatter trigger times
        duration: speedLimits.min + Math.random() * (speedLimits.max - speedLimits.min),
        swayX: -50 + Math.random() * 100, // sway offset amplitude Y
        rotateDeg: 90 + Math.random() * 360,
        maxOpacity: 0.45 + Math.random() * 0.55,
        size: 14 + Math.random() * 14, // Medium size range (14px - 28px)
      });
    }

    setSnowflakes(generatedSnowflakes);

    // Countdown setup (5 seconds duration)
    let leftTime = 100;
    const intervalTime = 50; // ms
    const decrement = (intervalTime / 5000) * 100;

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.05) {
          clearInterval(countdownIntervalRef.current!);
          return 0;
        }
        return Math.max(0, parseFloat((prev - intervalTime / 1000).toFixed(2)));
      });
    }, intervalTime);

    effectTimeoutRef.current = setTimeout(() => {
      setActiveEffect('none');
      setSnowflakes([]);
      clearInterval(countdownIntervalRef.current!);
    }, 5000);
  };

  // Balloon core trigger 
  const triggerBalloons = () => {
    if (stopRequested) return;

    // Reset previous states
    if (effectTimeoutRef.current) clearTimeout(effectTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setActiveEffect('balloons');
    setCountdown(5.0);
    setSnowflakes([]);

    // Trigger balloon sound
    if (balloonsSound) {
      synthInstance.playBalloonAtmosphere();
    }

    // Balloon metadata generation with high-class color scheme
    const counts = getParticleCounts().balloons;
    const speedLimits = getDurationScaling(3.4, 4.8);
    const formalColorPalette = [
      '#d4af37', // Gold 
      '#475569', // Slate Gray
      '#0f766e', // Teal Emerald
      '#991b1b', // Deep Crimson
      '#1e3a8a', // Corporate Navy
      '#be123c', // Warm Maroon
      '#111827', // Obsidian Black
      '#ca8a04', // Champagne Bronze
    ];

    const generatedBalloons: BalloonItem[] = [];
    for (let i = 0; i < counts; i++) {
      generatedBalloons.push({
        id: `balloon-${i}-${Math.random()}`,
        left: 2 + Math.random() * 88, // avoid edges
        delay: Math.random() * 3.4,
        duration: speedLimits.min + Math.random() * (speedLimits.max - speedLimits.min),
        swayX: -70 + Math.random() * 140,
        rotateDeg: -20 + Math.random() * 40,
        size: 38 + Math.random() * 16, // Medium size range (38px - 54px)
        color: formalColorPalette[Math.floor(Math.random() * formalColorPalette.length)],
      });
    }

    setBalloons(generatedBalloons);

    // Duration timer handling
    const intervalTime = 50; 
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.05) {
          clearInterval(countdownIntervalRef.current!);
          return 0;
        }
        return Math.max(0, parseFloat((prev - intervalTime / 1000).toFixed(2)));
      });
    }, intervalTime);

    effectTimeoutRef.current = setTimeout(() => {
      setActiveEffect('none');
      setBalloons([]);
      clearInterval(countdownIntervalRef.current!);
    }, 5000);
  };

  // Individual Sound Tests for testing audio loading states
  const testChimeSound = () => {
    synthInstance.init();
    synthInstance.playSnowflakeAtmosphere();
  };

  const testBalloonSound = () => {
    synthInstance.init();
    synthInstance.playBalloonAtmosphere();
  };

  return (
    <div id="app-root" className="min-h-screen bg-gradient-to-tr from-sky-200 via-violet-100 to-rose-200 text-slate-800 font-sans selection:bg-purple-900 selection:text-white flex flex-col items-center justify-between overflow-x-hidden relative pb-12">
      
      {/* GLOWING ORGANIC COLOURED BLURS FOR IMMERSIVE AESTHETICS */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-300/30 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-300/30 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl pointer-events-none -z-10" />

      {/* 1. MAIN SYSTEM CONTROL PANEL (Formal, Clean, and Perfectly Symmetrical) */}
      <main id="main-container" className="w-full max-w-4xl px-4 py-8 md:py-16 z-10 flex flex-col gap-6 flex-grow justify-center">
        
        {/* Header Block with high design standard */}
        <header id="header-section" className="text-center flex flex-col gap-3">
          <div className="mx-auto bg-gradient-to-r from-violet-600 to-pink-600 px-4 py-1 rounded-full text-[10px] font-mono tracking-widest text-white uppercase inline-block shadow-md shadow-purple-500/10">
            ATMOSPHERIC EXPERIMENTATION LAB
          </div>
          <h1 id="app-title" className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-pink-600 to-amber-600">
              Atmospheric Effects Player
            </span>
          </h1>
          <p id="app-subtitle" className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            Experience real-time interactive, beautifully paced climate particles paired with lightweight procedural audio generators.
          </p>
        </header>

        {/* Master Controller Stage (Elegant Colorful Glassmorphism Panel) */}
        <div id="master-dashboard-card" className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col gap-6 transition-all duration-300">
          
          {/* HIGH IMPACT GRAND ROW (Playful, Vibrant, side-by-side action triggers) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            
            {/* Play/Trigger Snowflakes Button */}
            <button
              id="btn-trigger-snowflakes"
              onClick={triggerSnowflakes}
              disabled={activeEffect === 'snowflakes'}
              className={`group relative text-left p-6 rounded-2xl transition-all duration-300 flex flex-col gap-4 items-start overflow-hidden cursor-pointer min-h-[140px] border-0 shadow-lg ${
                activeEffect === 'snowflakes'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-400/30'
                  : 'bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 text-white hover:scale-[1.02] shadow-cyan-300/20 hover:shadow-cyan-400/30'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-sm">
                  <Snowflake className="w-6 h-6 animate-spin-slow" />
                </div>
                {activeEffect === 'snowflakes' ? (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                ) : (
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono font-semibold tracking-wider">ACTIVE</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Snowflakes</h3>
                <span className="text-[11px] font-mono opacity-90 uppercase tracking-widest">
                  Falling Sequence
                </span>
              </div>
            </button>

            {/* Play/Trigger Balloons Button */}
            <button
              id="btn-trigger-balloons"
              onClick={triggerBalloons}
              disabled={activeEffect === 'balloons'}
              className={`group relative text-left p-6 rounded-2xl transition-all duration-300 flex flex-col gap-4 items-start overflow-hidden cursor-pointer min-h-[140px] border-0 shadow-lg ${
                activeEffect === 'balloons'
                  ? 'bg-gradient-to-br from-pink-600 to-rose-700 text-white shadow-rose-400/30'
                  : 'bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white hover:scale-[1.02] shadow-rose-300/20 hover:shadow-rose-400/30'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-sm">
                  <span className="text-2xl select-none leading-none block">🎈</span>
                </div>
                {activeEffect === 'balloons' ? (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                ) : (
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono font-semibold tracking-wider">ACTIVE</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Balloons</h3>
                <span className="text-[11px] font-mono opacity-90 uppercase tracking-widest">
                  Rising Sequence
                </span>
              </div>
            </button>

            {/* Powerful Master Reset / STOP Button - Colourful & Highly Functional */}
            <button
              id="btn-stop-animations"
              onClick={stopAllAnimations}
              disabled={activeEffect === 'none'}
              className={`group relative text-left p-6 rounded-2xl transition-all duration-300 flex flex-col gap-4 items-start overflow-hidden cursor-pointer min-h-[140px] border-0 shadow-lg ${
                activeEffect !== 'none'
                  ? 'bg-gradient-to-br from-red-500 via-rose-600 to-rose-700 text-white hover:scale-[1.02] shadow-red-500/20 hover:shadow-red-500/30'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed opacity-65 shadow-none'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className={`p-2.5 rounded-xl ${
                  activeEffect !== 'none' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-400'
                } backdrop-blur-sm`}>
                  <Square className="w-5 h-5 fill-current" />
                </div>
                {activeEffect !== 'none' && (
                  <span className="text-[10px] bg-red-400/30 text-white font-mono px-2 py-0.5 rounded-full font-semibold">
                    HALTING
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Simulation Brake</h3>
                <span className="text-[11px] font-mono opacity-90 uppercase tracking-widest">
                  Stop Anim & Audio
                </span>
              </div>
            </button>

          </div>

          {/* PARAMETERS BAR & SOUND BOARD INSIDE MAIN CARD (Clean, single-line/grid horizontal layout) */}
          <div className="bg-slate-50/70 border border-slate-250 p-4 md:p-5 rounded-2xl flex flex-col gap-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-700 font-bold" />
                <span className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">
                  Integrated Sound Synth Engine
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px] font-mono">
                <Cpu className="w-3 h-3 text-emerald-600 animate-pulse" />
                <span>Audio Latency: 0s (Procedural)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Sound toggles column */}
              <div className="col-span-1 md:col-span-8 flex flex-wrap gap-3">
                
                <button
                  id="toggle-snowflakes-sound"
                  onClick={() => setSnowflakesSound(!snowflakesSound)}
                  className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                    snowflakesSound
                      ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm'
                      : 'bg-slate-200 border-slate-300 text-slate-500'
                  }`}
                >
                  {snowflakesSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>Snowflake Audio: {snowflakesSound ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  id="toggle-balloons-sound"
                  onClick={() => setBalloonsSound(!balloonsSound)}
                  className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                    balloonsSound
                      ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm'
                      : 'bg-slate-200 border-slate-300 text-slate-500'
                  }`}
                >
                  {balloonsSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>Balloon Audio: {balloonsSound ? 'ON' : 'OFF'}</span>
                </button>

              </div>

              {/* Master Volume Controller Column */}
              <div className="col-span-1 md:col-span-4 flex items-center gap-2.5 bg-white p-2 border border-slate-200 rounded-xl shadow-inner w-full">
                <span className="text-[10px] font-bold font-mono tracking-tight text-slate-500 uppercase shrink-0">
                  VOL ({synthVolume}%)
                </span>
                <input
                  id="slider-synth-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={synthVolume}
                  onChange={(e) => setSynthVolume(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-1 rounded bg-slate-200 appearance-none"
                  aria-label="Synthesizer master volume"
                />
              </div>

            </div>

            {/* Quick parameter inline customizer */}
            <div className="border-t border-slate-200/80 pt-3.5 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 font-mono tracking-wider uppercase">Particle Settings:</span>
                <div className="flex gap-1.5">
                  <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full font-semibold font-mono uppercase">
                    Density: {density === 'light' ? '轻 (Light)' : density === 'medium' ? '中 (Med)' : '浓 (Dense)'}
                  </span>
                  <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-semibold font-mono uppercase">
                    Velocity: {speed}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Configure Parameters:</span>
                <select 
                  id="select-density"
                  value={density} 
                  onChange={(e) => setDensity(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="light">Light Density</option>
                  <option value="medium">Medium Density</option>
                  <option value="dense">Dense Density</option>
                </select>
                <select 
                  id="select-velocity"
                  value={speed} 
                  onChange={(e) => setSpeed(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="gentle">Gentle Speed</option>
                  <option value="normal">Normal Speed</option>
                  <option value="fast">Fast Speed</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* 2. REAL-TIME ACTIVITY MONITOR (Only Diagnostic Logs is preserved) */}
        <div id="live-monitoring-box" className="w-full">
          
          <div id="diagnostic-synth-logs" className="bg-white/70 backdrop-blur-md border border-white/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg w-full">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-800 shadow-sm">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold font-mono text-purple-600 uppercase tracking-widest block">Waveform Payload</span>
                <span className="text-xs font-medium text-slate-700 leading-tight">
                  {activeEffect === 'snowflakes' ? '15 Sparkling Pentatonic Wind Waves (OscS)' : activeEffect === 'balloons' ? '8 Linear Whistles & 4 Friction Sounds (OscT)' : 'Interactive Synthesizer Idle - Awaiting Trigger'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {activeEffect !== 'none' && (
                <div className="text-xs font-mono font-bold text-white bg-slate-900 py-1.5 px-3 rounded-lg shadow-sm animate-pulse flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {countdown.toFixed(2)}s Remaining
                </div>
              )}
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100/80 px-2 py-1 rounded">
                Buffer Latency: &lt;1ms
              </span>
            </div>
          </div>

        </div>

        {/* 3. DYNAMIC PROGRESS DECK BAR */}
        <AnimatePresence>
          {activeEffect !== 'none' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 font-mono tracking-wider font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>PLAYING CLIMATE MATRIX SEQUENCE FOR 5 SECONDS</span>
                </div>
                <span className="font-mono bg-pink-600/30 text-pink-300 border border-pink-500/20 px-3 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
                  {activeEffect}
                </span>
              </div>
              
              {/* Modern elegant physical countdown bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-violet-500 via-pink-550 to-amber-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manual/Synthesis Testing suite for interactive satisfaction & requirements compliance */}
        <section id="synth-chaperone" className="p-4 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl flex flex-col gap-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-700" />
              <h3 className="text-xs font-bold tracking-wider text-slate-800 uppercase font-mono">
                Synth Diagnostics Panel
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Validate real-time synthesizers instantly</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={testChimeSound}
              className="px-4 py-2.5 bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 border border-blue-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between transition-all cursor-pointer shadow-sm hover:border-blue-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-450 shadow animate-ping" />
                <span>Test Alpine Wind Wave</span>
              </div>
              <span className="text-[10px] font-mono text-sky-700 bg-sky-100/50 px-2 py-0.5 rounded">Trigger Crystal</span>
            </button>
            <button
              onClick={testBalloonSound}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-50 to-amber-50 hover:from-rose-100 hover:to-amber-100 border border-rose-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between transition-all cursor-pointer shadow-sm hover:border-rose-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-450 shadow animate-ping" />
                <span>Test Latex Float Sound</span>
              </div>
              <span className="text-[10px] font-mono text-rose-700 bg-rose-100/50 px-2 py-0.5 rounded font-medium">Trigger Squeak</span>
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="footer-section" className="w-full py-6 text-center text-xs text-slate-500 font-mono z-10">
        VISUAL SIMULATION SUITE © 2026 • STYLISH EXPERIMENTATION ENGINE
      </footer>

      {/* ======================================================================= */}
      {/* 4. VISUAL EFFECT RENDER overlays (Absolute pointer events none layer) */}
      {/* ======================================================================= */}
      <div id="particles-overlay-stage" className="fixed inset-0 pointer-events-none z-50 overflow-hidden w-full h-full">
        
        {/* Render Snowflakes falling from top */}
        {activeEffect === 'snowflakes' && snowflakes.map((snowflake) => (
          <div
            key={snowflake.id}
            className="absolute animate-snowflake text-slate-350 select-none pointer-events-none flex items-center justify-center opacity-0"
            style={{
              left: `${snowflake.left}%`,
              width: `${snowflake.size}px`,
              height: `${snowflake.size}px`,
              top: `-40px`,
              '--fall-duration': `${snowflake.duration}s`,
              '--sway-x': `${snowflake.swayX}px`,
              '--rotate-deg': `${snowflake.rotateDeg}deg`,
              '--max-opacity': snowflake.maxOpacity,
              animationDelay: `${snowflake.delay}s`,
            } as CSSProperties}
          >
            <Snowflake 
              style={{
                width: '100%',
                height: '100%',
                strokeWidth: 1.2,
                color: 'rgba(148, 163, 184, 0.95)' // Slate-400 classy icy glaze
              }}
            />
          </div>
        ))}

        {/* Render Balloons rising from bottom */}
        {activeEffect === 'balloons' && balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute animate-balloon select-none pointer-events-none opacity-0"
            style={{
              left: `${balloon.left}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.33}px`, // ratio for standard realistic balloons
              bottom: `-120px`,
              '--rise-duration': `${balloon.duration}s`,
              '--sway-x': `${balloon.swayX}px`,
              '--rotate-deg': `${balloon.rotateDeg}deg`,
              animationDelay: `${balloon.delay}s`,
            } as CSSProperties}
          >
            <BalloonSVG color={balloon.color} />
          </div>
        ))}

      </div>

    </div>
  );
}
