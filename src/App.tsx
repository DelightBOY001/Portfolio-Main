import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, Palette, Cpu, Zap, ArrowRight, MapPin, Phone, ChevronDown, Briefcase, Users, Award, Circle, Square } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="loading-text text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            K
          </motion.span>
        </motion.div>
        
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.p
          className="text-white/40 text-xs tracking-widest font-outfit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          LOADING
        </motion.p>
      </div>
    </motion.div>
  );
}


function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 80 - 40, 0],
            opacity: [0, p.opacity, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

function AnimatedGrid() {
  return (
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function GlowingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-[100px]", className)}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function AnimatedProgressBar({ level, delay = 0 }: { level: number; delay?: number }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-white/60 via-white to-white/60 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold text-white font-playfair tracking-wide group"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-white italic group-hover:text-white/80 transition-colors">K</span>aran
          <motion.span
            className="inline-block ml-0.5 text-white/60"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            .
          </motion.span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-all font-outfit"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="relative z-10">{item.name}</span>
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-white/20 transition-all font-outfit"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Let's Talk</span>
          <ArrowRight size={14} />
        </motion.a>

        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white/60 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all font-outfit"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <a
                href="#contact"
                className="mt-2 text-center py-3 bg-white text-black font-semibold rounded-full font-outfit"
                onClick={() => setIsOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [showContent, setShowContent] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1200);
    const cardTimer = setTimeout(() => setShowCard(true), 1800);
    return () => {
      clearTimeout(timer);
      clearTimeout(cardTimer);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.08)_0%,_transparent_50%),radial-gradient(ellipse_at_70%_80%,_rgba(255,255,255,0.05)_0%,_transparent_40%)]" />
        
        <GlowingOrb className="w-[500px] h-[500px] bg-white/8 top-1/4 left-1/4" />
        <GlowingOrb className="w-[400px] h-[400px] bg-white/5 bottom-1/4 right-1/4" delay={1} />
        
        <AnimatedGrid />
        <FloatingParticles />
        
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute top-20 right-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border border-white/5 rounded-full"
          />
        </motion.div>
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-32 left-20"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border border-white/5"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ 
              opacity: showContent ? 1 : 0, 
              y: showContent ? 0 : -30, 
              scale: showContent ? 1 : 0.8 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/60 text-sm font-outfit tracking-wide">Available for work</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair leading-[1.05]">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Hi, I'm{' '}
            </motion.span>
            <motion.span 
              className="italic relative block"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: showContent ? 1 : 0, 
                scale: showContent ? 1 : 0.8, 
                rotate: showContent ? 0 : -10 
              }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
            >
              Karan Kumar
              <motion.svg 
                className="absolute -bottom-2 left-0 w-full" 
                viewBox="0 0 200 8" 
                preserveAspectRatio="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.path
                  d="M0,5 Q50,7 100,5 T200,5"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showContent ? 1 : 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-white/50 mb-8 max-w-xl mx-auto lg:mx-0 font-outfit font-light leading-relaxed"
          >
            A passionate{' '}
            <span className="text-white font-medium">Web Designer</span>,{' '}
            <span className="text-white font-medium">Developer</span>, and{' '}
            <span className="text-white font-medium">Coder</span> crafting elegant digital experiences
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.a
              href="#projects"
              className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 font-outfit"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all font-outfit"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex gap-8 justify-center lg:justify-start mt-12"
          >
            {[
              { value: '5+', label: 'Years Exp', icon: Briefcase },
              { value: '50+', label: 'Projects', icon: Code2 },
              { value: '30+', label: 'Clients', icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <stat.icon size={18} className="text-white/60" />
                </motion.div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white font-outfit">{stat.value}</p>
                  <p className="text-xs text-white/40 font-outfit">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.8, rotate: 5 }}
          animate={{ 
            opacity: showCard ? 1 : 0, 
            x: showCard ? 0 : 60, 
            scale: showCard ? 1 : 0.8,
            rotate: showCard ? 0 : 5
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2, 
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 100
          }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            style={{ y: y1 }}
            className="relative"
            whileHover={{ y: -15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-[3rem] blur-3xl"
              animate={{ 
                scale: showCard ? [1, 1.1, 1] : 1,
                opacity: showCard ? [0.5, 0.8, 0.5] : 0
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <motion.div
              className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 w-full max-w-sm overflow-hidden"
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
                animate={{ scale: [1.1, 1, 1.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              
              <motion.div 
                className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-white/20 rounded-tl-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0 }}
                transition={{ delay: 1.8 }}
              />
              <motion.div 
                className="absolute top-5 right-5 w-10 h-10 border-r-2 border-t-2 border-white/20 rounded-tr-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0 }}
                transition={{ delay: 1.9 }}
              />
              <motion.div 
                className="absolute bottom-5 left-5 w-10 h-10 border-l-2 border-b-2 border-white/20 rounded-bl-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0 }}
                transition={{ delay: 2.0 }}
              />
              <motion.div 
                className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-white/20 rounded-br-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0 }}
                transition={{ delay: 2.1 }}
              />

              <div className="relative mb-6">
                <motion.div
                  className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent p-[2px]"
                  whileHover={{ scale: 1.02 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: showCard ? 1 : 0, rotate: showCard ? 0 : -180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.5 }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
                    <motion.span
                      className="text-7xl font-bold text-white font-playfair italic"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: showCard ? 1 : 0, rotate: showCard ? 0 : -180 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.7 }}
                    >
                      K
                    </motion.span>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute bottom-3 right-1/2 translate-x-14 w-4 h-4 bg-emerald-400 rounded-full border-4 border-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: showCard ? [1, 1.3, 1] : 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                />
              </div>

              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 20 }}
                transition={{ delay: 1.9 }}
              >
                <h3 className="text-2xl font-bold text-white mb-1 font-playfair">Karan Kumar</h3>
                <p className="text-white/50 font-outfit tracking-wide text-sm">Full Stack Developer</p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-3 gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 20 }}
                transition={{ delay: 2.1 }}
              >
                {[
                  { value: '5+', label: 'Years Exp' },
                  { value: '50+', label: 'Projects' },
                  { value: '30+', label: 'Clients' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0.8 }}
                    transition={{ delay: 2.2 + i * 0.1 }}
                    className="text-center p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <p className="text-xl font-bold text-white font-outfit">{stat.value}</p>
                    <p className="text-xs text-white/40 font-outfit">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-2 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: showCard ? 1 : 0 }}
                transition={{ delay: 2.4 }}
              >
                {['React', 'TypeScript', 'Node.js', 'UI/UX'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0.8 }}
                    transition={{ delay: 2.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    className="px-4 py-1.5 text-xs bg-white/5 border border-white/10 text-white/70 rounded-full font-outfit hover:border-white/20 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showCard ? 1 : 0 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs font-outfit tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: typeof Code2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
      >
        {Icon && <Icon size={16} className="text-white/60" />}
        <span className="text-white/60 text-sm font-outfit tracking-wide">{subtitle}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"
      />
    </motion.div>
  );
}

function About() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" className="py-32 bg-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-white/3 rounded-full blur-[150px] -translate-y-1/2" />
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader title="About Me" subtitle="Get to know me" />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl p-10">
              <p className="text-lg text-white/60 leading-relaxed mb-6 font-outfit font-light">
                I'm a passionate web developer and designer with expertise in creating 
                elegant, user-friendly digital experiences. I combine technical skills 
                with creative vision to build websites that not only look sophisticated 
                but perform exceptionally.
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 font-outfit font-light">
                With a focus on modern technologies and clean code, I transform ideas 
                into reality. Whether it's a personal portfolio, business website, or 
                complex web application, I bring dedication and attention to detail 
                to every project.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Code2, label: 'Developer' },
                  { icon: Palette, label: 'Designer' },
                  { icon: Cpu, label: 'Coder' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-2 text-white/70"
                  >
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <item.icon size={16} className="text-white/60" />
                    </motion.div>
                    <span className="font-outfit font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { title: 'Clean Code', desc: 'Maintainable & scalable', icon: Code2 },
              { title: 'Modern Design', desc: 'Beautiful interfaces', icon: Palette },
              { title: 'Fast Performance', desc: 'Optimized for speed', icon: Zap },
              { title: 'Responsive', desc: 'Works on all devices', icon: Award },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-2xl p-6 cursor-default group"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <item.icon size={22} className="text-white/50 group-hover:text-white/80 transition-colors" />
                </motion.div>
                <h4 className="text-white font-semibold mb-1 font-outfit">{item.title}</h4>
                <p className="text-white/40 text-sm font-outfit">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: 'React & React Native', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript/ES6+', level: 95 },
    { name: 'Node.js', level: 88 },
    { name: 'CSS/Tailwind/SCSS', level: 92 },
    { name: 'Python', level: 75 },
  ];

  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="skills" className="py-32 bg-black relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <motion.div
        className="absolute left-10 top-1/4 w-20 h-20 border border-white/5"
        animate={{ rotate: [0, 90, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-10 bottom-1/4"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Square className="w-16 h-16 text-white/5" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeader title="My Skills" subtitle="Technologies I work with" />

        <div ref={ref} className="grid md:grid-cols-2 gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 group"
              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.15)" }}
            >
              <motion.div
                className="flex justify-between items-center mb-4"
              >
                <span className="text-white font-medium font-outfit">{skill.name}</span>
                <motion.span
                  className="text-white/40 text-sm font-outfit"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, color: "rgba(255,255,255,0.8)" }}
                >
                  {skill.level}%
                </motion.span>
              </motion.div>
              <AnimatedProgressBar level={skill.level} delay={index * 0.1} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <p className="text-center text-white/40 text-sm mb-6 font-outfit">Plus many more technologies</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Git', 'Docker', 'AWS', 'Figma', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Next.js', 'Vue.js', 'REST APIs'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
                className="px-5 py-2.5 bg-black/50 border border-white/10 text-white/50 rounded-full hover:border-white/25 hover:text-white/80 transition-all cursor-default font-outfit text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with cart, checkout, and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB'],
      featured: true,
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio with smooth animations and responsive design.',
      tags: ['TypeScript', 'Framer Motion', 'Tailwind'],
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates.',
      tags: ['React', 'Firebase', 'Redux'],
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with location-based forecasts and charts.',
      tags: ['React', 'API', 'Chart.js'],
    },
  ];

  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="projects" className="py-32 bg-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-[150px] translate-y-1/2 translate-x-1/2" />
        <motion.div
          className="absolute top-1/3 left-10 w-16 h-16 border border-white/5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader title="My Projects" subtitle="Featured work" />

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <motion.div 
                className={`relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 ${project.featured ? 'h-72' : 'h-56'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center"
                  >
                    <Code2 className="w-10 h-10 text-white/10" />
                  </motion.div>
                </div>
                
                <motion.div
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3.5 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3.5 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <Github size={20} />
                  </motion.button>
                </motion.div>

                <motion.div 
                  className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/20"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                />
                <motion.div 
                  className="absolute top-4 right-4 w-8 h-8 border-r border-t border-white/20"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                />
                <motion.div 
                  className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-white/20"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                />
                <motion.div 
                  className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/20"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                />

                {project.featured && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 right-16"
                  >
                    <span className="px-3 py-1 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full font-outfit">
                      Featured
                    </span>
                  </motion.div>
                )}
              </motion.div>

              <div className="p-7">
                <motion.h3
                  className="text-xl font-bold text-white mb-3 font-playfair"
                  whileHover={{ x: 5 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-white/40 mb-5 font-outfit font-light leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 text-xs bg-white/5 border border-white/10 text-white/60 rounded-full font-outfit"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/karanjii190"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/60 rounded-full hover:border-white/40 hover:text-white transition-all font-outfit"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} />
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

  function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { ref, isInView } = useScrollAnimation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      const endpoint = (import.meta.env?.VITE_CONTACT_ENDPOINT as string | undefined) || '/api/contact';

      try {
        const payload = {
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          console.error('Contact form server error:', data);
          throw new Error((data && data.message) || `Server responded ${res.status}`);
        }

        setFormState({ name: '', email: '', subject: '', message: '' });
        alert('Message sent — you will receive it via WhatsApp shortly.');
      } catch (err) {
        console.error('Contact form error:', err);
        alert('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <section id="contact" className="py-32 bg-black relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-white/5"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Circle className="w-20 h-20 text-white/5" />
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader title="Get In Touch" subtitle="Let's work together" />

          <div ref={ref} className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                { icon: Mail, label: 'Email', value: 'karanjii190@gmail.com', desc: 'Send me an email' },
                { icon: MapPin, label: 'Location', value: 'India', desc: 'Available worldwide' },
                { icon: Phone, label: 'Phone', value: 'Adding Soon', desc: 'Mon-Fri 9am-6pm' },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass rounded-2xl p-6 group hover:bg-white/5 transition-all cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <item.icon size={20} className="text-white/60" />
                    </motion.div>
                    <div>
                      <p className="text-white/40 text-sm font-outfit">{item.label}</p>
                      <p className="text-white font-semibold font-outfit mt-1">{item.value}</p>
                      <p className="text-white/40 text-sm font-outfit mt-1">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <motion.form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8"
                whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-white/50 text-sm mb-3 font-outfit">Name</label>
                    <motion.input
                      type="text"
                      value={formState.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:bg-white/10 transition-all font-outfit"
                      placeholder="Your name"
                      required
                      whileFocus={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.01 }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-white/50 text-sm mb-3 font-outfit">Email</label>
                    <motion.input
                      type="email"
                      value={formState.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:bg-white/10 transition-all font-outfit"
                      placeholder="your@email.com"
                      required
                      whileFocus={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.01 }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="mb-5"
                >
                  <label className="block text-white/50 text-sm mb-3 font-outfit">Subject</label>
                  <motion.input
                    type="text"
                    value={formState.subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:bg-white/10 transition-all font-outfit"
                    placeholder="Project inquiry"
                    required
                    whileFocus={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.01 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45 }}
                  className="mb-7"
                >
                  <label className="block text-white/50 text-sm mb-3 font-outfit">Message</label>
                  <motion.textarea
                    rows={5}
                    value={formState.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:bg-white/10 transition-all resize-none font-outfit"
                    placeholder="Tell me about your project..."
                    required
                    whileFocus={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.01 }}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/20 transition-all font-outfit disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-black border-t border-white/5 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-white font-playfair">
              <span className="italic">K</span>aran
            </span>
            <motion.span
              className="w-1 h-1 bg-white/30 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/40 text-sm font-outfit">Portfolio</span>
          </motion.div>

          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { icon: Github, href: 'https://github.com/karanjii190', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:karanjii190@gmail.com', label: 'Email' },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-white/40 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -3, color: "rgba(255,255,255,1)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-white/40 text-sm font-outfit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            © {currentYear} Karan Kumar. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
