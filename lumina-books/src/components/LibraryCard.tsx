import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book3D } from './Book3D';
import type { Book } from '../types/booktype';

export const LibraryCard = ({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) => {
  const [active, setActive] = useState(false);
  const appleEase = [0.32, 0, 0.07, 1] as [number, number, number, number];

  return (
    <div 
      className={`relative w-full aspect-[4/5] ${book.bgColor} rounded-[32px] md:rounded-[48px] p-8 md:p-12 flex flex-col cursor-pointer overflow-hidden transition-all duration-1000 group shadow-sm`}
      // Desktop Hover
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      // Mobile Touch Toggle
      onClick={() => setActive(!active)}
    >
      {/* 1. DISPLACING HEADER (Smaller for mobile) */}
      <motion.div 
        className="relative z-10 pointer-events-none"
        animate={{ y: active ? -5 : 0, opacity: active ? 0.6 : 1 }}
        transition={{ duration: 1.2, ease: appleEase }}
      >
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">{book.genre}</p>
        <h3 className="text-2xl md:text-4xl font-bold tracking-tighter leading-none max-w-[150px] md:max-w-[200px] text-neutral-800">
          {book.title}
        </h3>
      </motion.div>

      {/* 2. THE 3D BOOK (Auto-scaling for mobile) */}
      <div className="mt-auto self-center translate-y-8 flex justify-center items-center pointer-events-none scale-75 md:scale-100">
        <Book3D book={book} isOpen={active} />
      </div>

      {/* 3. CLICK SENSOR + CTA (iOS App style) */}
      <div className="absolute bottom-6 md:bottom-10 left-8 md:left-12 flex items-center justify-between w-[calc(100%-64px)] z-20">
        <span className="text-lg md:text-xl font-bold text-neutral-900">${book.price}</span>
        
        {/* We keep a dedicated button for the Details modal on mobile */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents the toggle click
            onOpen(book);
          }}
          className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/5 active:scale-90 transition-transform"
        >
          View Specs
        </button>
      </div>
    </div>
  );
};