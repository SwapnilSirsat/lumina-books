import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useBookLogic } from './hooks/useBookLogic';
import { LibraryCard } from './components/LibraryCard';
import { MOCK_BOOKS } from './mocklibrary/mockBooks';

// Global Apple Cinematic Easing
const appleTransition = { 
  duration: 1.5, 
  ease: [0.32, 0, 0.07, 1] as [number, number, number, number] 
};

export default function App() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredBooks, 
    selectedBook, 
    setSelectedBook, 
    isReading, 
    setIsReading 
  } = useBookLogic(MOCK_BOOKS);

  return (
    <div className="min-h-screen bg-[#f5f5f7] overflow-x-hidden">
      {/* 1. NAVIGATION (Apple Global Bar) */}
      <nav className="fixed top-0 w-full h-12 z-[100] bg-white/70 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-10">
        <div 
          className="font-bold text-xl tracking-tighter cursor-pointer select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Lumina
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-widest text-neutral-400">
          <span className="hover:text-black cursor-pointer transition-colors">Store</span>
          <span className="hover:text-black cursor-pointer transition-colors">Collections</span>
          <span className="hover:text-black cursor-pointer transition-colors">Support</span>
        </div>
        <div className="flex items-center gap-6">
          <ShoppingBag size={17} className="text-neutral-500 cursor-pointer hover:text-black transition-colors" />
        </div>
      </nav>

      {/* 2. HERO SECTION (iPhone-style cinematic entrance) */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center pt-20 px-10 text-center max-w-7xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...appleTransition, delay: 0.2 }}
          className="text-orange-600 font-bold text-xl mb-4"
        >
          Lumina Air.
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={appleTransition} 
          className="text-7xl md:text-[140px] font-bold tracking-tighter mb-12 leading-[0.8] select-none"
        >
          Read in <br/> 
          <span className="text-neutral-300">Dimension.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...appleTransition, delay: 0.5 }}
          className="max-w-2xl w-full relative group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" />
          <input 
            className="w-full bg-white py-6 pl-16 pr-8 rounded-[30px] text-xl font-bold border-none outline-none shadow-sm focus:shadow-xl ring-blue-50 focus:ring-[12px] transition-all duration-700"
            placeholder="Search by title, author, or genre..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Floating Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mt-20 flex flex-col items-center opacity-30"
        >
           <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Experience</span>
           <div className="w-px h-24 bg-neutral-900" />
        </motion.div>
      </section>

      {/* 3. HIGHLIGHT GALLERY (iPhone Highlight Reels) */}
      <section className="py-40 overflow-hidden bg-white">
        <div className="px-10 mb-16 flex justify-between items-end max-w-7xl mx-auto">
           <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">The magic <br/> unfolds.</h2>
           <div className="flex gap-2 text-blue-600 font-bold items-center cursor-pointer group hover:gap-4 transition-all">
             Watch the collection <ArrowRight size={20}/>
           </div>
        </div>
        
        <div className="flex gap-10 px-10 overflow-x-auto no-scrollbar pb-10">
          {filteredBooks.slice(0, 8).map(book => (
            <div key={book.id} className="min-w-[450px] md:min-w-[550px]">
               <LibraryCard book={book} onOpen={setSelectedBook} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAIN LIBRARY GRID (The Bento Library) */}
      <main className="bg-[#f5f5f7] py-40 px-10">
        <div className="max-w-7xl mx-auto">
           <div className="mb-24">
             <span className="text-blue-600 font-black uppercase tracking-[0.5em] text-xs block mb-4 underline decoration-4 underline-offset-8">Browse the Archive</span>
             <h2 className="text-4xl md:text-8xl font-bold tracking-tighter leading-none">Select your block.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredBooks.map(book => (
                <LibraryCard key={book.id} book={book} onOpen={setSelectedBook} />
              ))}
           </div>
        </div>
      </main>

      {/* 5. PRODUCT DETAIL OVERLAY (The Product "Hardware" Detail View) */}
      <AnimatePresence mode="wait">
        {selectedBook && !isReading && (
          <motion.div 
             key="detail-modal"
             initial={{ y: "100%" }} 
             animate={{ y: 0 }} 
             exit={{ y: "100%" }} 
             transition={{ duration: 1, ease: [0.32, 0, 0.07, 1] }}
             className="fixed inset-0 z-[110] bg-white overflow-y-auto px-6 pb-40"
          >
             <nav className="h-16 flex items-center justify-between sticky top-0 bg-white/70 backdrop-blur-md px-10 z-50 mb-10">
                <span className="font-bold text-neutral-300 text-[10px] uppercase tracking-widest italic opacity-50">Studio Overview</span>
                <button 
                  onClick={() => setSelectedBook(null)} 
                  className="p-4 bg-neutral-100 rounded-full hover:rotate-90 transition-all duration-500"
                >
                  <X size={20}/>
                </button>
             </nav>
             
             <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center px-6">
                <div className="perspective-3000">
                  <motion.div 
                    initial={{ scale: 0.7, opacity: 0, rotateY: 20 }} 
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
                    transition={appleTransition} 
                    className="w-full aspect-[3/4] rounded-[55px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-black/5 bg-[#fafafa] relative"
                  >
                    <img src={selectedBook.cover} className="w-full h-full object-cover" />
                    {/* Visual simulated iPhone-style floating bar */}
                    <div className="absolute top-0 h-10 w-full bg-black/5 flex items-center justify-center">
                       <div className="h-1.5 w-16 bg-black/10 rounded-full" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex flex-col">
                   <h2 className="text-7xl md:text-9xl font-bold tracking-tighter mb-10 leading-[0.8]">{selectedBook.title}</h2>
                   <p className="text-3xl text-neutral-400 font-medium italic mb-12">By {selectedBook.author}</p>
                   <p className="text-xl text-neutral-500 leading-relaxed mb-16 max-w-lg font-medium">{selectedBook.description}</p>
                   
                   <div className="flex gap-4">
                     <button 
                       onClick={() => setIsReading(true)} 
                       className="flex-[2] h-20 bg-blue-600 text-white rounded-full font-bold text-2xl shadow-xl shadow-blue-100 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                     >
                       <BookOpen /> Read Free Sample
                     </button>
                     <button className="flex-1 h-20 border-[3px] border-black rounded-full font-bold text-2xl hover:bg-black hover:text-white transition-all">Buy ${selectedBook.price}</button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. READER INTERFACE (Paper Kindle Experience) */}
      <AnimatePresence>
        {isReading && selectedBook && (
           <motion.div 
             key="reader"
             initial={{ opacity: 0, y: 50 }} 
             animate={{ opacity: 1, y: 0 }} 
             exit={{ opacity: 0, y: 50 }} 
             transition={appleTransition}
             className="fixed inset-0 z-[120] bg-[#FAF9F6] pt-12 overflow-y-auto"
           >
              <nav className="fixed top-0 w-full h-14 bg-white/70 backdrop-blur-xl flex items-center justify-between px-10 border-b border-stone-200">
                 <button 
                  onClick={() => setIsReading(false)} 
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40"
                 >
                   <ChevronLeft size={16}/> Back
                 </button>
                 <span className="italic font-bold font-serif opacity-80">{selectedBook.title}</span>
                 <div className="flex gap-6 font-serif">
                   <span className="opacity-40 underline">Aa</span>
                   <span className="opacity-40">Info</span>
                 </div>
              </nav>

              <div className="max-w-2xl mx-auto py-32 px-10 text-neutral-900 leading-[2.1] text-2xl font-serif">
                 <h1 className="text-center text-stone-200 tracking-[0.5em] mb-20 uppercase text-xs font-black font-sans">Endpaper Publication</h1>
                 <p className="whitespace-pre-wrap selection:bg-blue-50">
                   <span className="text-8xl font-black float-left mr-4 mt-2 leading-[0.7]">{selectedBook.content[0]}</span>
                   {selectedBook.content.slice(1)}
                 </p>
                 <div className="h-32" /> {/* End space */}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}