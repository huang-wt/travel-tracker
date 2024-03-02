import { Observable } from "rxjs";

export interface City {
  id: number;
  name: string;
  country: string;
  visitedYear: string;
  rating: number;
  review: string;
  imageUrl: string;
  position$: Observable<any> | undefined;
}