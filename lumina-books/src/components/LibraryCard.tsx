import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book3D } from './Book3D';
import type { Book } from '../types/booktype';

export const LibraryCard = ({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const appleEase = [0.32, 0, 0.07, 1] as [number, number, number, number];

  return (
    <div 
      className={`relative w-full aspect-[4/5] ${book.bgColor} rounded-[48px] p-12 flex flex-col cursor-pointer overflow-hidden transition-all duration-1000 group hover:shadow-2xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Editorial Header */}
      <motion.div 
        className="relative z-10 pointer-events-none"
        animate={{ y: isHovered ? -5 : 0, opacity: isHovered ? 0.6 : 1 }}
        transition={{ duration: 1.2, ease: appleEase }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">{book.genre}</p>
        <h3 className="text-4xl font-bold tracking-tighter leading-none max-w-[200px] text-neutral-800">
          {book.title}
        </h3>
      </motion.div>

      {/* The 3D Book Pedestal */}
      <div className="mt-auto self-center translate-y-8 flex justify-center items-center pointer-events-none">
        <Book3D book={book} isOpen={isHovered} />
      </div>

      {/* FIXED CLICK LAYER - Stops the "brrr" jitter */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          onOpen(book);
        }}
        className="absolute inset-0 z-50 cursor-pointer bg-transparent border-none appearance-none"
        aria-label="View Details"
      />

      <div className="absolute bottom-10 left-12 flex items-center gap-6 z-10 pointer-events-none font-bold">
        <span className="text-xl text-neutral-900">${book.price}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700">See Specs →</span>
      </div>
    </div>
  );
};