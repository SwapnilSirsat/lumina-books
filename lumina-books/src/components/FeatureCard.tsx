import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book3D } from './Book3D';
import type { Book } from '../types/libraryTypes';

interface FeatureCardProps {
  book: Book;
  onOpenDetail: (book: Book) => void;
}

export const FeatureCard = ({ book, onOpenDetail }: FeatureCardProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div 
      className={`relative w-full aspect-[4/5] rounded-[48px] ${book.bgColor} flex flex-col p-12 transition-all duration-700 overflow-hidden cursor-pointer`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => onOpenDetail(book)}
    >
      <div className="z-10">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">{book.genre}</p>
        <h3 className="text-4xl font-bold tracking-tighter leading-[0.9] max-w-[200px] text-neutral-800">
          {book.title}
        </h3>
      </div>

      <div className="mt-auto self-center mb-10 translate-x-4">
        <Book3D book={book} isOpen={hovering} />
      </div>

      <div className="absolute bottom-10 left-12 flex items-center gap-6">
        <p className="text-xl font-bold tracking-tight">${book.price}</p>
        <motion.button 
          whileHover={{ x: 5 }}
          className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold transition-all"
        >
          Explore →
        </motion.button>
      </div>
    </div>
  );
};