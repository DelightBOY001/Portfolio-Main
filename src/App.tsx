import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, Palette, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utilities
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold text-white font-['Playfair_Display'] tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white italic">Karan's Portfolio</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white/70 hover:text-white transition-all text-sm font-medium tracking-wide font-['Outfit']"
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors py-2 font-['Outfit']"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section with Profile Card
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects - Royal Black & White */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/30 via-black to-black" />
        
        {/* Elegant light effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/3 rounded-full blur-[100px]" />
        
        {/* Grid Pattern - Subtle */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Diagonal lines for texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.1) 2px,
              rgba(255, 255, 255, 0.1) 4px
            )`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm font-['Outfit'] tracking-wide">Available for projects</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Playfair_Display'] leading-[1.1]">
            Hi, I'm{' '}
            <span className="italic text-white relative">
              Karan Kumar
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-px bg-white/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 mb-10 max-w-xl mx-auto lg:mx-0 font-['Outfit'] font-light">
            A passionate <span className="text-white font-medium">Web Designer</span>,{' '}
            <span className="text-white font-medium">Developer</span>, and{' '}
            <span className="text-white font-medium">Coder</span> crafting elegant digital experiences
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.a
              href="#projects"
              className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-white/10 transition-all flex items-center gap-2 font-['Outfit']"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/40 transition-all font-['Outfit']"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center lg:justify-start mt-10">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white hover:border-white transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}

// Profile Card Component - Enhanced
function ProfileCard() {
  return (
    <motion.div
      className="relative"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Card Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-white/5 to-white/10 rounded-[2rem] blur-2xl" />
      
      {/* Main Card */}
      <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 w-full max-w-sm">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-white/20 to-white/5 p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                <span className="text-6xl font-bold text-white font-['Playfair_Display'] italic">K</span>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute bottom-2 right-1/2 translate-x-12 w-5 h-5 bg-white rounded-full border-4 border-black"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-1 font-['Playfair_Display']">Karan Kumar</h3>
          <p className="text-white/50 font-['Outfit'] tracking-wide">Full Stack Developer</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: '3.2+', label: 'Years Exp' },
            { value: '7+', label: 'Projects' },
            { value: '10+', label: 'Clients' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-xl font-bold text-white font-['Outfit']">{stat.value}</p>
              <p className="text-xs text-white/40 font-['Outfit']">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'TypeScript', 'Node.js', 'UI/UX'].map((skill) => (
            <span
              key={skill}
              className="px-4 py-1.5 text-xs bg-white/5 border border-white/10 text-white/70 rounded-full font-['Outfit']"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
      </div>
    </motion.div>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Playfair_Display']">
            About <span className="italic">Me</span>
          </h2>
          <div className="w-24 h-px bg-white/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-3xl" />
            <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">
              <p className="text-lg text-white/60 leading-relaxed mb-6 font-['Outfit'] font-light">
                I'm a passionate web developer and designer with expertise in creating 
                elegant, user-friendly digital experiences. I combine technical skills 
                with creative vision to build websites that not only look sophisticated 
                but perform exceptionally.
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 font-['Outfit'] font-light">
                With a focus on modern technologies and clean code, I transform ideas 
                into reality. Whether it's a personal portfolio, business website, or 
                complex web application, I bring dedication and attention to detail 
                every project.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Code2 size={20} className="text-white/60" />
                  <span className="font-['Outfit'] font-medium">Developer</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Palette size={20} className="text-white/60" />
                  <span className="font-['Outfit'] font-medium">Designer</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Cpu size={20} className="text-white/60" />
                  <span className="font-['Outfit'] font-medium">Coder</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { title: 'Clean Code', desc: 'Maintainable & scalable solutions', color: 'white' },
              { title: 'Modern Design', desc: 'Beautiful user interfaces', color: 'white' },
              { title: 'Fast Performance', desc: 'Optimized for speed', color: 'white' },
              { title: 'Responsive', desc: 'Works on all devices', color: 'white' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <div className={`w-3 h-3 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors`} />
                </div>
                <h4 className="text-white font-semibold mb-1 font-['Outfit']">{item.title}</h4>
                <p className="text-white/40 text-sm font-['Outfit']">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'CSS/Tailwind', level: 92 },
    { name: 'Python', level: 75 },
  ];

  return (
    <section id="skills" className="py-32 bg-black relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Playfair_Display']">
            My <span className="italic">Skills</span>
          </h2>
          <div className="w-24 h-px bg-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-['Outfit'] font-light">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium font-['Outfit']">{skill.name}</span>
                <span className="text-white/40 text-sm font-['Outfit']">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-white/80 via-white to-white/80"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap gap-3 justify-center"
        >
          {['Git', 'Docker', 'AWS', 'Figma', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Next.js'].map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 bg-black/50 border border-white/10 text-white/50 rounded-full hover:border-white/30 hover:text-white/80 transition-all cursor-default font-['Outfit'] text-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with cart, checkout, and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB'],
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

  return (
    <section id="projects" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Playfair_Display']">
            My <span className="italic">Projects</span>
          </h2>
          <div className="w-24 h-px bg-white/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Project Image Placeholder */}
              <div className="h-52 relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-white/10" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <Github size={20} />
                  </motion.button>
                </div>
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/20" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-white/20" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-white/20" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/20" />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3 font-['Playfair_Display']">{project.title}</h3>
                <p className="text-white/40 mb-5 font-['Outfit'] font-light">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-white/5 border border-white/10 text-white/60 rounded-full font-['Outfit']"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="py-32 bg-black relative">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Playfair_Display']">
            Get In <span className="italic">Touch</span>
          </h2>
          <div className="w-24 h-px bg-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-['Outfit'] font-light max-w-xl mx-auto">
            Have a project in mind? Let's create something elegant together.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white/50 text-sm mb-3 font-['Outfit']">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors font-['Outfit']"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/50 text-sm mb-3 font-['Outfit']">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors font-['Outfit']"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-white/50 text-sm mb-3 font-['Outfit']">Subject</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors font-['Outfit']"
                placeholder="Project inquiry"
              />
            </div>
            <div className="mb-8">
              <label className="block text-white/50 text-sm mb-3 font-['Outfit']">Message</label>
              <textarea
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors resize-none font-['Outfit']"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/10 transition-all font-['Outfit']"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { label: 'Email', value: 'karan@example.com', icon: Mail },
              { label: 'Location', value: 'India', icon: ExternalLink },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-white/40 font-['Outfit']">
                <item.icon size={16} />
                <span>{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-['Outfit']">
            © 2024 Karan Kumar. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/40 hover:text-white text-sm transition-colors font-['Outfit']"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
