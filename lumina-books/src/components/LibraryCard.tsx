import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book3D } from './Book3D';
import type { Book } from '../types/booktype';

export const LibraryCard = ({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) => {
  const [hover, setHover] = useState(false);
  
  // Signature Apple Cinematic Transition
  const appleTransition = { duration: 1.5, ease: [0.32, 0, 0.07, 1] as [number, number, number, number] };

  return (
    <motion.div 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(book)}
      className={`relative w-full aspect-[4/5] ${book.bgColor} rounded-[52px] p-12 flex flex-col cursor-pointer overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-1000`}
    >
      {/* 1. DISPLACING HEADER (Top-Left) */}
      <motion.div 
        className="z-10"
        animate={{ 
          x: hover ? -5 : 0,
          y: hover ? -5 : 0,
          opacity: hover ? 0.4 : 1 
        }}
        transition={appleTransition}
      >
        <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30 mb-2">
          {book.genre}
        </p>
        <h3 className="text-4xl font-bold tracking-tighter leading-none max-w-[180px]">
          {book.title}
        </h3>
      </motion.div>

      {/* 2. TOP-RIGHT PRICE TAG (Safe from Cover Swing) */}
      <motion.div 
        className="absolute top-12 right-12 text-right z-10"
        animate={{ 
          x: hover ? 5 : 0, 
          scale: hover ? 1.1 : 1 
        }}
        transition={appleTransition}
      >
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 opacity-40">Price</p>
        <p className="text-2xl font-black tracking-tighter text-black">${book.price}</p>
      </motion.div>

      {/* 3. 3D BOOK WITH SIDE OFFSET
          As the book opens, we shift the entire book -10px to the right 
          to make room for the cover on the left. */}
      <div className="mt-auto self-center translate-y-12">
        <motion.div
           animate={{ x: hover ? 25 : 0 }} // Creating opening room
           transition={appleTransition}
        >
          <Book3D book={book} isOpen={hover} />
        </motion.div>
      </div>

      {/* 4. RECDEDING METADATA (Bottom) */}
      <motion.div 
        className="absolute bottom-12 left-12 flex items-center gap-6 z-10"
        animate={{ 
            y: hover ? 5 : 0, 
            opacity: hover ? 0.3 : 1 
        }}
        transition={appleTransition}
      >
        <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 italic opacity-50 mb-1">Created By</span>
            <span className="text-sm font-bold text-black uppercase tracking-tight">{book.author}</span>
        </div>
        
        <motion.div 
           className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/30 backdrop-blur-md"
           whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.8)' }}
        >
           <span className="text-xs font-bold">→</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};