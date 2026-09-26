import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import { useBookLogic } from './hooks/useBookLogic';
import { LibraryCard } from './components/LibraryCard';
import { MOCK_BOOKS } from './mocklibrary/dummyBooks';

const appleTransition = { duration: 1.5, ease: [0.32, 0, 0.07, 1] as [number, number, number, number] };

export default function App() {
  const { searchTerm, setSearchTerm, filteredBooks, selectedBook, setSelectedBook, isReading, setIsReading } = useBookLogic(MOCK_BOOKS);

  return (
    <div className="min-h-screen bg-[#f5f5f7] overflow-x-hidden selection:bg-blue-100">
      
      {/* 1. NATIVE FEEL NAVIGATION */}
      <nav className="fixed top-0 w-full h-12 z-[100] bg-white/70 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-6 md:px-10">
        <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lumina</div>
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
           <span className="hover:text-black transition-colors cursor-pointer">Archive</span>
           <span className="hover:text-black cursor-pointer">Specs</span>
        </div>
        <div className="flex gap-4 md:gap-6 items-center">
            <ShoppingBag size={18} className="text-neutral-500" />
        </div>
      </nav>

      {/* 2. ADAPTIVE HERO */}
      <header className="pt-28 md:pt-48 pb-20 px-6 md:px-10 text-center max-w-7xl mx-auto flex flex-col items-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={appleTransition} className="text-orange-600 font-bold mb-4 uppercase tracking-[0.4em] text-[10px]">Ready for iPhone 16</motion.p>
        
        {/* Adjusted typography for mobile: text-5xl -> text-9xl */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={appleTransition} 
          className="text-5xl md:text-[140px] font-bold tracking-tighter mb-10 md:mb-12 leading-[0.9] md:leading-[0.8]">
          Read in <br/><span className="text-neutral-300">Dimension.</span>
        </motion.h1>

        <div className="max-w-xl w-full relative mt-6 md:mt-12 px-2">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 w-4 h-4" />
          <input 
            className="w-full bg-white border-none outline-none py-4 md:py-6 pl-12 md:pl-16 pr-8 rounded-2xl md:rounded-full text-lg shadow-sm focus:shadow-2xl focus:ring-4 ring-blue-50 transition-all duration-700" 
            placeholder="Search authors..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
      </header>

      {/* 3. HIGHLIGHT REEL (Touch scrollable) */}
      <section className="bg-white py-20 md:py-40">
        <div className="px-6 md:px-10 max-w-7xl mx-auto flex justify-between items-end mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Editor's <span className="text-neutral-300 italic font-serif">Picks</span></h2>
          <div className="text-blue-600 font-bold text-sm flex gap-2 items-center">Full Archive <ArrowRight size={14}/></div>
        </div>

        {/* This container allows "flick" scrolling on phones */}
        <div className="flex gap-6 md:gap-10 px-6 md:px-10 overflow-x-auto no-scrollbar pb-10">
           {filteredBooks.slice(0, 8).map(book => (
             <div key={book.id} className="min-w-[300px] md:min-w-[500px] shrink-0">
               <LibraryCard book={book} onOpen={setSelectedBook} />
             </div>
           ))}
        </div>
      </section>

      {/* 4. MAIN STACK (Stacks into 1 column on mobile) */}
      <section className="py-20 md:py-40 px-6 md:px-10 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-8xl font-bold tracking-tighter">All Objects.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredBooks.map(book => <LibraryCard key={book.id} book={book} onOpen={setSelectedBook} />)}
          </div>
        </div>
      </section>

      {/* 5. MOBILE-ADAPTIVE SHOWCASE */}
      <AnimatePresence>
        {selectedBook && !isReading && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ ...appleTransition, duration: 0.8 }}
             className="fixed inset-0 z-[150] bg-white flex flex-col pt-4 md:pt-10 overflow-y-auto px-6 pb-20">
            <div className="sticky top-0 w-full h-12 flex justify-end items-center z-50">
               <button onClick={() => setSelectedBook(null)} className="p-3 md:p-4 bg-neutral-100 rounded-full"><X size={20} /></button>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
              <div className="rounded-[30px] md:rounded-[55px] overflow-hidden shadow-2xl aspect-[3/4] bg-white">
                 <img src={selectedBook.cover} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <h2 className="text-5xl md:text-9xl font-bold tracking-tighter leading-none mb-6">{selectedBook.title}</h2>
                <p className="text-xl md:text-3xl text-neutral-400 mb-8 font-medium">By {selectedBook.author}</p>
                <p className="text-lg text-neutral-500 leading-relaxed mb-10 px-4 md:px-0">{selectedBook.description}</p>
                
                {/* Mobile Button Stack: Stacked for accessibility */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 px-4 md:px-0">
                  <button onClick={() => setIsReading(true)} className="h-16 bg-blue-600 text-white rounded-full font-black text-lg flex items-center justify-center gap-3">
                    <BookOpen size={20}/> Read Experience
                  </button>
                  <button className="h-16 border-2 border-black rounded-full font-bold text-lg active:bg-black active:text-white transition-colors">Rent for $3.99</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. READER (Adjusted text size for thumb-reading) */}
      <AnimatePresence>
        {isReading && selectedBook && (
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
             className="fixed inset-0 z-[200] bg-[#FAF9F6] pt-12 overflow-y-auto">
              <nav className="fixed top-0 w-full h-12 bg-white/90 backdrop-blur-xl border-b flex items-center justify-between px-6">
                 <button onClick={() => setIsReading(false)} className="text-[9px] font-black uppercase tracking-[0.2em]">Close</button>
                 <span className="font-serif italic font-bold truncate px-4">{selectedBook.title}</span>
                 <ShoppingBag size={14} className="opacity-0" />
              </nav>
              <div className="max-w-xl mx-auto py-20 px-8 text-neutral-900 text-2xl md:text-3xl leading-[1.8] font-serif">
                 <p className="selection:bg-blue-100">
                    <span className="text-7xl font-black float-left mr-4 mt-2 leading-[0.7]">{selectedBook.content[0]}</span>
                    {selectedBook.content.slice(1)}
                 </p>
                 <div className="h-20" />
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}