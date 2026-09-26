import { motion } from 'framer-motion';
import type { Book } from '../types/booktype';

interface Book3DProps { book: Book; isOpen: boolean; }

export const Book3D = ({ book, isOpen }: Book3DProps) => {
  const transition = { duration: 1.8, ease: [0.32, 0, 0.07, 1] as [number, number, number, number] };

  return (
    <div className="relative perspective-3000 w-56 h-72">
      <motion.div 
        className="w-full h-full preserve-3d"
        animate={{ 
          rotateY: isOpen ? -10 : -15, 
          rotateX: isOpen ? 5 : 10,
          y: isOpen ? -30 : 0, 
          scale: isOpen ? 1.05 : 1 
        }}
        transition={transition}
      >
        {/* ROUNDED SPINE */}
        <div className="absolute left-0 top-0 h-full w-10 origin-left preserve-3d" style={{ transform: 'rotateY(-90deg) translateX(-5px)' }}>
          <div className="absolute inset-0 bg-[#111] spine-curve shadow-inner" />
          <div className="absolute inset-0 flex items-center justify-center rotate-90">
             <span className="text-[6px] font-bold text-white/10 uppercase tracking-widest">{book.title}</span>
          </div>
        </div>

        {/* THICKNESS / PAGES BLOCK */}
        <div className="absolute inset-y-[2px] right-0 z-10 [transform:translateZ(-32px)] border-y border-neutral-300"
             style={{ width: 'calc(100% - 10px)', background: 'linear-gradient(90deg, #e5e5e5, #fff 10%, #fff 90%, #e5e5e5)' }}>
          <div className="w-full h-full opacity-20" style={{ background: 'repeating-linear-gradient(0deg, #ccc 0px, #ccc 1px, transparent 1px, transparent 3px)' }} />
        </div>

        {/* BACK COVER */}
        <div className="absolute inset-0 bg-[#1a1a1a] rounded-sm [transform:translateZ(-35px)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]" />

        {/* INTERIOR PAGE (Revealed when open) */}
        <div className="absolute inset-[3px] z-20 bg-[#FAF9F6] p-8 [transform:translateZ(-15px)] border-l border-neutral-100 flex flex-col justify-between">
           <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <h5 className="text-[10px] font-bold text-neutral-300 uppercase mb-4 tracking-widest">Lumina Editions</h5>
              <p className="text-xs leading-relaxed font-serif text-neutral-800">
                "{book.description.slice(0, 100)}..."
              </p>
           </div>
        </div>

        {/* FRONT COVER (The Animated Hinge) */}
        <motion.div 
          className="absolute inset-0 z-30 preserve-3d"
          style={{ transformOrigin: '0% 50%' }}
          animate={{ rotateY: isOpen ? -165 : 0, x: isOpen ? -8 : 0 }}
          transition={transition}
        >
          <div className="absolute inset-0 backface-hidden rounded-r-sm overflow-hidden border-l-[1px] border-white/10">
            <img src={book.cover} className="w-full h-full object-cover" />
            {/* The Spine joint indent */}
            <div className="absolute left-[18px] top-0 w-[1px] h-full bg-white/10" />
            <div className="absolute left-0 top-0 w-5 h-full bg-black/20 blur-[1px]" />
          </div>

          {/* INSIDE COVER (Matte Endpaper) */}
          <div className="absolute inset-0 backface-hidden bg-[#1a1a1a] p-10 flex flex-col items-center justify-center border-r-[8px] border-black/40"
               style={{ transform: 'rotateY(180deg)' }}>
             <div className="w-14 h-14 rounded-full border border-neutral-800 flex items-center justify-center italic text-xl text-neutral-700">L</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};