import { motion } from 'framer-motion';
import type { Book } from '../types/booktype';

interface Book3DProps {
  book: Book;
  isOpen: boolean;
}

export const Book3D = ({ book, isOpen }: Book3DProps) => {
  // Apple's "Magic" Easing Curve: High impact, extremely slow decay
  const appleTransition = { 
    duration: 1.5, 
    ease: [0.32, 0, 0.07, 1] as [number, number, number, number] 
  };

  return (
    <div className="relative perspective-3000 w-56 h-72">
      {/* SHADOW - Dynamically reacts to the book lifting */}
      <div 
        className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/20 blur-3xl rounded-[100%] transition-all duration-1000 
        ${isOpen ? 'opacity-40 scale-125' : 'opacity-20 scale-100'}`} 
      />

      <motion.div 
        className="w-full h-full preserve-3d"
        animate={{ 
          rotateY: isOpen ? -12 : -18, 
          rotateX: isOpen ? 4 : 8,
          y: isOpen ? -30 : 0, // The "Physical Lift" from the table
          scale: isOpen ? 1.05 : 1 
        }}
        transition={appleTransition}
      >
        {/* 1. THE SPINE (The Rounded physical edge) */}
        <div 
          className="absolute left-0 top-0 h-full w-10 origin-left preserve-3d"
          style={{ transform: 'rotateY(-90deg) translateX(-5px)' }}
        >
          <div className="absolute inset-0 bg-[#1a1a1a] spine-curve shadow-inner border-l border-white/5" />
          <div className="absolute inset-0 flex items-center justify-center rotate-90">
             <span className="text-[7px] font-bold text-white/10 uppercase tracking-widest whitespace-nowrap">
               Lumina Press Edition
             </span>
          </div>
        </div>

        {/* 2. THE PAGE BLOCK (Visible Thickness) */}
        <div 
          className="absolute inset-y-[2px] right-0 z-10 [transform:translateZ(-30px)] border-y border-neutral-300 shadow-inner"
          style={{ 
            width: 'calc(100% - 10px)', 
            background: 'linear-gradient(90deg, #f0f0f0 0%, #ffffff 10%, #ffffff 90%, #f0f0f0 100%)' 
          }}
        >
           {/* Repeating lines for individual pages grain */}
           <div 
             className="w-full h-full opacity-20" 
             style={{ background: 'repeating-linear-gradient(0deg, #ccc 0px, #ccc 1px, transparent 1px, transparent 3px)' }} 
           />
        </div>

        {/* 3. THE BACK COVER (Physical Base) */}
        <div 
          className="absolute inset-0 bg-[#111] rounded-sm [transform:translateZ(-35px)]"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        />

        {/* 4. THE FIRST INTERIOR PAGE (Revealed Content) */}
        <div className="absolute inset-[3px] z-20 bg-[#FAF9F6] p-8 [transform:translateZ(-18px)] border-l border-neutral-100 flex flex-col justify-start">
           <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-300 mb-2">Introduction</p>
              <h5 className="text-[12px] font-serif font-bold text-neutral-800 leading-tight mb-4">{book.title}</h5>
              <div className="w-6 h-[1px] bg-blue-600 mb-6" />
              <div className="space-y-2 opacity-30">
                 <div className="h-1 w-full bg-neutral-900 rounded" />
                 <div className="h-1 w-full bg-neutral-900 rounded" />
                 <div className="h-1 w-2/3 bg-neutral-900 rounded" />
              </div>
           </div>
        </div>

        {/* 5. THE FRONT COVER (Hinge-Pivot Hinge) */}
        <motion.div 
          className="absolute inset-0 z-30 preserve-3d shadow-2xl"
          style={{ transformOrigin: '0% 50%' }}
          animate={{ 
            rotateY: isOpen ? -165 : 0,
            x: isOpen ? -10 : 0 // Lifting hinge simulation
          }}
          transition={appleTransition}
        >
          {/* COVER OUTSIDE (Artwork) */}
          <div className="absolute inset-0 backface-hidden rounded-r-[3px] overflow-hidden border-l-[1px] border-white/10">
            <img src={book.cover} className="w-full h-full object-cover" alt="cover" loading="eager" />
            
            {/* The Spine "Joint" Groove Indentation */}
            <div className="absolute left-0 top-0 w-6 h-full bg-black/20 blur-[1px]" />
            <div className="absolute left-[19px] top-0 w-[1px] h-full bg-white/10" />

            {/* Cloth Surface Grain Texture */}
            <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay cloth-texture" />
          </div>

          {/* COVER INSIDE (Luxe Charcoal Endpaper) */}
          <div 
            className="absolute inset-0 backface-hidden bg-[#181818] p-12 flex flex-col items-center justify-center border-r-[10px] border-black/40 shadow-inner"
            style={{ transform: 'rotateY(180deg)' }}
          >
             <div className="w-16 h-16 rounded-full border border-amber-900/10 flex items-center justify-center mb-6">
                <span className="text-amber-900/30 font-serif text-3xl font-light italic">L</span>
             </div>
             <p className="text-[10px] uppercase tracking-[0.5em] text-amber-900/20 font-bold leading-loose text-center">
                Archive Collection <br /> Edition No. {book.id}
             </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};