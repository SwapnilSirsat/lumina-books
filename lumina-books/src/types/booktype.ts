export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  rentPrice: number;
  rating: number;
  cover: string;
  description: string;
  content: string;
  bgColor: string; // The color of the independent block
  isDark?: boolean; // Whether to use white or black text inside the block
}