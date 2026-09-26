import { motion } from 'framer-motion';
import { ChevronLeft, Bookmark } from 'lucide-react';
import type { Book } from '../types/booktype';

export const Reader = ({ book, onClose }: { book: Book; onClose: () => void }) => (
  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    className="fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col text-neutral-800">
    <nav className="h-16 glass flex items-center justify-between px-8">
      <button onClick={onClose} className="flex items-center gap-2 font-bold tracking-widest text-[10px] uppercase"><ChevronLeft size={18}/> Close</button>
      <span className="font-serif italic text-lg">{book.title}</span>
      <Bookmark size={20} className="opacity-20" />
    </nav>
    <div className="flex-1 overflow-y-auto px-8 py-20 font-serif leading-[2.1] text-2xl max-w-2xl mx-auto selection:bg-blue-100">
       <h1 className="text-center text-stone-300 tracking-[0.5em] mb-20 uppercase">Chapter 01</h1>
       <p className="whitespace-pre-wrap"><span className="text-7xl font-black float-left mr-3 mt-1 leading-none">{book.content[0]}</span>{book.content.slice(1)}</p>
    </div>
  </motion.div>
);