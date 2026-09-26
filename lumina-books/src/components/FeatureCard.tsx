import { motion } from 'framer-motion';
import { BookCard3D } from './BookCard3D';
import type { Book } from '../types/booktype';

interface FeatureCardProps {
  book: Book;
  onOpen: (book: Book) => void;
  color?: string;
  tagline: string;
}

export const FeatureCard = ({ book, onOpen, color = "bg-white", tagline }: FeatureCardProps) => {
  return (
    <div className={`apple-card min-w-[350px] md:min-w-[480px] h-[600px] flex flex-col p-12 relative group ${color}`}>
      <div className="z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2"
        >
          {book.genre}
        </motion.p>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tighter leading-tight max-w-[250px]"
        >
          {tagline}
        </motion.h3>
      </div>

      {/* The 3D Book Floating in the card */}
      <div className="absolute bottom-[-20px] right-[-20px] scale-110 md:scale-125 origin-bottom-right">
        <BookCard3D book={book} onOpen={onOpen} />
      </div>

      <div className="mt-auto z-10">
        <button 
          onClick={() => onOpen(book)}
          className="bg-[#0071e3] text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all"
        >
          Explore
        </button>
      </div>
    </div>
  );
};