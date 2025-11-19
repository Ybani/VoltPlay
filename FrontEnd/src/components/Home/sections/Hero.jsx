import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    id: 1,
    title: 'RGB Gaming Keyboards',
    subtitle: 'Up to 40% OFF',
    image: "src/assets/keyboard.jpg",
    gradient: 'from-[var(--color-bg-900)]/70 to-[var(--color-bg-800)]/70',
  },
  {
    id: 2,
    title: 'Pro Gaming Setup',
    subtitle: 'New Arrivals',
    image: "src/assets/setup.jpg",
    gradient: 'from-[var(--color-bg-800)]/70 to-[var(--color-bg-900)]/70',
  },
  {
    id: 3,
    title: 'Premium Gaming Headsets',
    subtitle: 'Immersive Sound',
    image: "src/assets/headphone.jpg",
    gradient: 'from-[var(--color-bg-900)]/60 to-[var(--color-bg-800)]/60',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // change every 7s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-screen bg-black text-white">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full"
        >
          <div className="relative h-full">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-linear-to-r ${slides[currentSlide].gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-6xl mb-4 bg-linear-to-r from-[var(--color-neon-blue)] via-[var(--color-electric-purple)] to-[var(--color-magenta)] bg-clip-text text-transparent font-bold drop-shadow-[0_0_12px_var(--color-neon-blue)]"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl text-white font-semibold drop-shadow-[0_0_6px_var(--color-neon-blue)]"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] via-[var(--color-electric-purple)] to-[var(--color-magenta)] text-white font-bold rounded-lg shadow-[0_0_16px_var(--color-neon-blue)] transition-all"
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom SVG wave */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg className="w-full " viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#111827" d="M0 80L60 70C120 60 240 40 360 36C480 32 600 44 720 58C840 72 960 88 1080 90C1200 92 1320 80 1380 74L1440 68V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z" />
        </svg>
      </div>
    </div>
  );
}
