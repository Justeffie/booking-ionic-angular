import { Injectable } from '@angular/core';
import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {delay, filter, map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
      new Place('p1',
          'Manhattan Mansion',
          'In the heart of New York City.',
          'https://eldiariony.files.wordpress.com/2018/04/502346910.jpg?quality=80&strip=all&w=509',
          139.99,
          new Date('2019-01-01'),
          new Date('2030-12-12'),
          'abc'),
      new Place('p2',
          'L\'Amour Toujours',
          'Romantic place in Paris',
          'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
          150.00,
          new Date('2019-01-01'),
          new Date('2030-12-12'),
          'abc'),
      new Place('p3',
          'The Foggy Palace',
          'Not your average city trip!',
          'https://images.fineartamerica.com/images-medium-large-5/foggy-palace-5-sfphotostore-.jpg',
          99.99,
          new Date('2019-01-01'),
          new Date('2030-12-12'),
          'bgh')
  ]);

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
      return this.places.pipe(take(1), map(places => {
          return {...places.find(p => p.id === id)};
      }));
  }

  addPlace(title: string, description: string, price: number, availableFrom: Date, availableTo: Date) {
        const newPlace = new Place(Math.random().toString(), title, description, 'https://images.fineartamerica.com/images-medium-large-5/foggy-palace-5-sfphotostore-.jpg', price, availableFrom, availableTo, this.authService.userId);
   return this.places.pipe(
       take(1),
       delay(1000),
       tap(places => {
           this._places.next(places.concat(newPlace));
   }));
  }

  updateOffer(placeid: string, title: string, description: string, price: number) {
     return this.places.pipe(
         take(1),
         delay(1000),
         tap(places => {
         const updatedPlaceIndex = places.findIndex(pl => pl.id === placeid);
         const updatedPlaces = [...places];
         const old = updatedPlaces[updatedPlaceIndex];
         updatedPlaces[updatedPlaceIndex] = new Place(old.id, title, description, old.image, price, old.availableFrom, old.availableTo, old.userId);
         this._places.next(updatedPlaces);
     }));
  }
  constructor(private authService: AuthService) { }
}
