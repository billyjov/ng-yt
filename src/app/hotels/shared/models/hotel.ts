export interface IHotel {
  id: number;
  hotelName: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  tags?: string[];
  // getNewPrice(price: number): number;
}
