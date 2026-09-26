import { motion } from 'framer-motion';
import type { Book } from '../types/booktype';

export const Book3D = ({ book, isOpen }: { book: Book; isOpen: boolean }) => {
  const transition = { duration: 1.5, ease: [0.32, 0, 0.07, 1] as [number, number, number, number] };

  return (
    <div className="relative perspective-3000 w-52 h-72">
      {/* Physical Depth shadow under the lift */}
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/20 blur-3xl rounded-[100%] transition-all duration-1000 ${isOpen ? 'opacity-40 scale-125 translate-y-2' : 'opacity-20 scale-100'}`} />

      <motion.div 
        className="w-full h-full preserve-3d"
        animate={{ 
          rotateY: isOpen ? -10 : -18, 
          rotateX: isOpen ? 5 : 8,
          y: isOpen ? -35 : 0, 
          scale: isOpen ? 1.05 : 1 
        }}
        transition={transition}
      >
        {/* ROUNDED SPINE */}
        <div className="absolute left-0 top-0 h-full w-10 origin-left preserve-3d" style={{ transform: 'rotateY(-90deg) translateX(-5px)' }}>
          <div className="absolute inset-0 bg-[#111] spine-curve shadow-inner" />
          <div className="absolute inset-0 flex items-center justify-center rotate-90 opacity-20">
             <span className="text-[7px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Collector Edition</span>
          </div>
        </div>

        {/* THICKNESS (Paper Edges) */}
        <div className="absolute inset-y-[3px] right-0 z-10 [transform:translateZ(-28px)] border-y border-neutral-300"
             style={{ width: 'calc(100% - 10px)', background: 'linear-gradient(90deg, #f0f0f0 0%, #fff 10%, #fff 90%, #f0f0f0 100%)' }}>
          <div className="w-full h-full opacity-30" style={{ background: 'repeating-linear-gradient(0deg, #ccc 0, #ccc 1px, transparent 1px, transparent 3px)' }} />
        </div>

        {/* BACK COVER */}
        <div className="absolute inset-0 bg-[#1a1a1a] rounded-sm [transform:translateZ(-30px)] shadow-[0_30px_60px_rgba(0,0,0,0.4)]" />

        {/* INTERIOR PAGE (What hides beneath) */}
        <div className="absolute inset-[4px] z-20 bg-[#FAF9F6] p-8 [transform:translateZ(-14px)] border-l border-neutral-200">
           <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <h5 className="text-[10px] font-bold text-neutral-300 uppercase mb-4 tracking-widest">Introduction</h5>
              <div className="h-[2px] w-8 bg-blue-600 mb-6" />
              <div className="space-y-2 opacity-20">
                 <div className="h-1 w-full bg-neutral-900 rounded" />
                 <div className="h-1 w-full bg-neutral-900 rounded" />
                 <div className="h-1 w-3/4 bg-neutral-900 rounded" />
              </div>
           </div>
        </div>

        {/* FRONT COVER */}
        <motion.div 
          className="absolute inset-0 z-30 preserve-3d"
          style={{ transformOrigin: '0% 50%' }}
          animate={{ rotateY: isOpen ? -165 : 0, x: isOpen ? -8 : 0 }}
          transition={transition}
        >
          {/* Front Face Art */}
          <div className="absolute inset-0 backface-hidden rounded-r shadow-2xl overflow-hidden border-l-[1px] border-white/5">
            <img src={book.cover} className="w-full h-full object-cover" alt="book" loading="eager" />
            <div className="absolute left-0 top-0 w-6 h-full bg-black/20 blur-[1px]" />
            <div className="absolute left-[18px] top-0 w-[1px] h-full bg-white/10 opacity-30" />
            <div className="absolute inset-0 cloth-texture opacity-10 pointer-events-none" />
          </div>

          {/* Endpaper Inside (Black fabric style) */}
          <div className="absolute inset-0 backface-hidden bg-[#181818] p-12 border-r-[8px] border-black/40 flex flex-col items-center justify-center text-center"
               style={{ transform: 'rotateY(180deg)' }}>
             <div className="w-16 h-16 rounded-full border border-amber-800/10 flex items-center justify-center font-serif text-3xl text-amber-900/30 italic">L</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};