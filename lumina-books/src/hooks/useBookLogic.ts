import { useState, useMemo } from 'react';
import type { Book } from '../types/booktype';

export const useBookLogic = (initialBooks: Book[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [genreFilter, setGenreFilter] = useState("All");

  const filteredBooks = useMemo(() => {
    if (!initialBooks) return [];
    return initialBooks.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter === "All" || book.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, genreFilter, initialBooks]);

  const genres = useMemo(() => {
    if (!initialBooks) return ["All"];
    return ["All", ...new Set(initialBooks.map((b) => b.genre))];
  }, [initialBooks]);

  return {
    searchTerm, setSearchTerm,
    selectedBook, setSelectedBook,
    isReading, setIsReading,
    genreFilter, setGenreFilter,
    filteredBooks, genres
  };
};