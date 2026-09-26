import { motion } from 'framer-motion';
import type { Book } from '../types/booktype';

interface BookCard3DProps {
  book: Book;
  onOpen: (book: Book) => void;
}

export const BookCard3D = ({ book, onOpen }: BookCard3DProps) => {
  // The "Apple Magic" Easing: Slow, heavy, and extremely smooth
  const springConfig = { 
    type: "spring", 
    stiffness: 40, 
    damping: 15, 
    mass: 1.2 
  };

  const slowTransition = { 
    duration: 1.2, 
    ease: [0.32, 0, 0.07, 1] as [number, number, number, number] 
  };

  return (
    <motion.div 
      className="relative perspective-3000 w-52 h-72 cursor-pointer group"
      onClick={() => onOpen(book)}
      whileHover="hover"
      initial="initial"
    >
      {/* THE ENTIRE BOOK CONTAINER (Handling the "Lift" and "Tilt") */}
      <motion.div 
        className="w-full h-full preserve-3d relative"
        variants={{
          initial: { rotateX: 0, rotateY: 0, y: 0, scale: 1 },
          hover: { rotateX: 10, rotateY: -10, y: -25, scale: 1.1 }
        }}
        transition={slowTransition}
      >
        
        {/* 1. DYNAMIC SHADOW (Gets bigger and blurrier as book lifts) */}
        <motion.div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/20 blur-2xl rounded-[100%] opacity-0 group-hover:opacity-100"
          variants={{
            initial: { scale: 0.8, opacity: 0.2 },
            hover: { scale: 1.2, opacity: 0.4 }
          }}
          transition={slowTransition}
        />

        {/* 2. BACK COVER */}
        <div 
          className="absolute inset-0 bg-[#222] rounded-r-sm [transform:translateZ(-25px)]"
          style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}
        />

        {/* 3. PAGE BLOCK (The paper thickness) */}
        <div 
          className="absolute inset-y-[3px] right-0 z-10 [transform:translateZ(-20px)] border-y border-neutral-200"
          style={{ 
            width: 'calc(100% - 10px)',
            background: 'linear-gradient(90deg, #e5e5e5 0%, #fff 5%, #fff 95%, #e5e5e5 100%)'
          }}
        >
          {/* Micro-lines for individual pages */}
          <div className="w-full h-full opacity-30" 
               style={{ background: 'repeating-linear-gradient(0deg, #ccc 0, #ccc 1px, transparent 1px, transparent 3px)' }} />
        </div>

        {/* 4. THE FIRST PAGE (Visible when cover opens) */}
        <div 
          className="absolute inset-[3px] z-20 bg-[#FAF9F6] p-8 [transform:translateZ(-10px)] shadow-inner border-l border-neutral-100"
        >
          <div className="h-full border-l border-neutral-100 pl-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-300">Preface</span>
            <h5 className="text-[12px] font-serif font-bold text-neutral-800 leading-tight mt-2">{book.title}</h5>
            <div className="w-6 h-[1px] bg-blue-600 my-4" />
            <p className="text-[7px] text-neutral-400 font-serif italic leading-relaxed">
              "To read is to fly; <br /> to create is to live."
            </p>
          </div>
        </div>

        {/* 5. FRONT COVER (The mechanical opening piece) */}
        <motion.div 
          className="absolute inset-0 z-30 preserve-3d"
          style={{ transformOrigin: '0% 50%' }}
          variants={{
            initial: { rotateY: 0 },
            hover: { rotateY: -125 }
          }}
          transition={slowTransition}
        >
          {/* Outside: The Art */}
          <div className="absolute inset-0 backface-hidden rounded-r-[3px] overflow-hidden border-l border-white/10 shadow-2xl">
            <img src={book.cover} className="w-full h-full object-cover" alt={book.title} />
            {/* The physical hinge groove */}
            <div className="absolute left-[18px] top-0 w-[1px] h-full bg-white/10" />
            <div className="absolute left-0 top-0 w-4 h-full bg-black/20 blur-[1px]" />
          </div>

          {/* Inside: Premium Endpaper */}
          <div 
            className="absolute inset-0 backface-hidden bg-[#181818] p-10 flex flex-col items-center justify-center border-r-[6px] border-black/40 shadow-inner"
            style={{ transform: 'rotateY(180deg)' }}
          >
             <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center mb-4">
                <span className="text-white/10 font-serif text-2xl font-light italic">L</span>
             </div>
             <p className="text-[7px] uppercase tracking-[0.5em] text-white/20 font-bold">Lumina First Edition</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Typography Label */}
      <div className="mt-14 text-center">
         <h3 className="text-lg font-bold tracking-tight text-neutral-900 leading-none mb-1">{book.title}</h3>
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 italic opacity-60">{book.author}</p>
      </div>
    </motion.div>
  );
};