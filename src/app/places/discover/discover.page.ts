import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  subs: Subscription;
  relevantPlaces: Place[];
  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ngOnInit() {
    this.subs = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
    });
  }

  onFilterUpdate(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      console.log(this.relevantPlaces);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter( place => place.userId !== this.authService.userId);
      console.log(this.relevantPlaces);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
