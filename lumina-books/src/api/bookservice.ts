const BASE_URL = "http://localhost:8080/api";

export const bookApi = {
  getAllBooks: async () => {
    const res = await fetch(`${BASE_URL}/books`);
    return res.json();
  },
  
  searchBooks: async (query: string) => {
    const res = await fetch(`${BASE_URL}/books/search?q=${query}`);
    return res.json();
  },

  getRentalStatus: async (bookId: string, userId: string) => {
    const res = await fetch(`${BASE_URL}/rentals/${userId}/${bookId}`);
    return res.json();
  }
};