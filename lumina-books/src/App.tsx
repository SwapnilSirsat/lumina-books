import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import { useBookLogic } from './hooks/useBookLogic';
import { LibraryCard } from './components/LibraryCard';
import { MOCK_BOOKS } from './mocklibrary/dummyBooks';

const appleTransition = { duration: 1.5, ease: [0.32, 0, 0.07, 1] as [number, number, number, number] };

export default function App() {
  const { searchTerm, setSearchTerm, filteredBooks, selectedBook, setSelectedBook, isReading, setIsReading } = useBookLogic(MOCK_BOOKS);

  return (
    <div className="min-h-screen bg-[#f5f5f7] overflow-x-hidden">
      {/* 1. TOP GLOBAL NAV */}
      <nav className="fixed top-0 w-full h-12 z-[100] bg-white/70 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-10">
        <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lumina</div>
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
           <span className="hover:text-black transition-colors cursor-pointer">Archive</span>
           <span className="hover:text-black transition-colors cursor-pointer">New York Store</span>
        </div>
        <ShoppingBag size={18} className="text-neutral-500 cursor-pointer" />
      </nav>

      {/* 2. THE BIG DIMENSION HERO */}
      <header className="pt-48 pb-20 px-10 text-center max-w-7xl mx-auto flex flex-col items-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={appleTransition} className="text-orange-600 font-bold mb-4 uppercase tracking-[0.4em] text-xs">Innovation in text</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={appleTransition} 
          className="text-8xl md:text-[140px] font-bold tracking-tighter mb-12 leading-[0.8] select-none">
          Read in <br/><span className="text-neutral-300">Dimension.</span>
        </motion.h1>
        <div className="max-w-xl w-full relative mt-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
          <input className="w-full bg-white border-none outline-none py-6 pl-16 pr-8 rounded-full text-xl shadow-sm focus:shadow-2xl focus:ring-8 ring-blue-50 transition-all duration-700" 
            placeholder="Search your collection" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </header>

      {/* 3. THE BENTO HIGHLIGHTS */}
      <section className="bg-white py-40">
        <div className="px-10 max-w-7xl mx-auto flex justify-between items-end mb-16">
          <h2 className="text-5xl font-bold tracking-tighter leading-none">Curated Picks. <br /><span className="text-neutral-400">Tactile precision.</span></h2>
          <div className="text-blue-600 font-bold flex gap-2 cursor-pointer group">Full Store <ArrowRight className="group-hover:translate-x-1 transition-transform" /></div>
        </div>
        <div className="flex gap-10 px-10 overflow-x-auto no-scrollbar pb-10">
           {filteredBooks.slice(0, 8).map(book => (
             <div key={book.id} className="min-w-[420px] md:min-w-[500px] shrink-0">
               <LibraryCard book={book} onOpen={setSelectedBook} />
             </div>
           ))}
        </div>
      </section>

      {/* 4. MAIN BLOCK LIBRARY */}
      <section className="py-40 px-10 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-bold text-blue-600 uppercase tracking-widest text-[10px]">Your Library</span>
            <h2 className="text-5xl font-bold tracking-tighter mt-2">Personal Stack.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredBooks.map(book => <LibraryCard key={book.id} book={book} onOpen={setSelectedBook} />)}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE OVERLAY */}
      <AnimatePresence>
        {selectedBook && !isReading && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ ...appleTransition, duration: 1 }}
             className="fixed inset-0 z-[150] bg-white flex flex-col pt-10 overflow-y-auto px-10 pb-40">
            <div className="sticky top-0 w-full h-12 flex justify-end px-4 z-50">
               <button onClick={() => setSelectedBook(null)} className="p-4 bg-neutral-100 rounded-full hover:scale-110 active:scale-90 transition-all"><X size={20} /></button>
            </div>
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={appleTransition} 
                className="rounded-[55px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] aspect-[3/4] border border-black/5 bg-white relative">
                 <img src={selectedBook.cover} className="w-full h-full object-cover" alt="" />
                 <div className="absolute top-0 h-10 w-full bg-gradient-to-b from-black/5 to-transparent" />
              </motion.div>
              <div className="flex flex-col">
                <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-10">{selectedBook.title}</h2>
                <p className="text-2xl text-neutral-400 font-medium italic mb-10">By {selectedBook.author}</p>
                <p className="text-xl text-neutral-600 leading-relaxed mb-16">{selectedBook.description}</p>
                <div className="flex gap-4">
                  <button onClick={() => setIsReading(true)} className="flex-[2] h-20 bg-blue-600 text-white rounded-full font-black text-2xl flex items-center justify-center gap-3">
                    <BookOpen /> READ INTERFACE
                  </button>
                  <button className="flex-1 h-20 border-[3px] border-black rounded-full font-bold text-2xl hover:bg-black hover:text-white transition-all">RENT ${selectedBook.rentPrice}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. READER INTERFACE (KINDLE) */}
      <AnimatePresence>
        {isReading && selectedBook && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={appleTransition} 
             className="fixed inset-0 z-[200] bg-[#FAF9F6] pt-12 overflow-y-auto font-serif">
              <nav className="fixed top-0 w-full h-12 bg-white/70 backdrop-blur-xl border-b border-neutral-100 flex items-center justify-between px-10">
                 <button onClick={() => setIsReading(false)} className="text-[10px] font-black uppercase tracking-widest text-black/50">End Experience</button>
                 <span className="font-serif italic font-bold text-neutral-900">{selectedBook.title}</span>
                 <div className="flex gap-6 opacity-30"><span>Aa</span><span>Info</span></div>
              </nav>
              <div className="max-w-2xl mx-auto py-32 px-10 text-stone-900 text-3xl leading-[2] text-justify selection:bg-blue-50">
                 <p><span className="text-9xl font-black float-left mr-6 mt-1 leading-[0.7]">{selectedBook.content[0]}</span>{selectedBook.content.slice(1)}</p>
                 <div className="h-40" />
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}