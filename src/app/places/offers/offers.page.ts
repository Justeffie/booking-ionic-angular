import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {IonItemSliding} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    loadedOffers: Place[];
    subs: Subscription;

  constructor(public placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.subs = this.placesService.places.subscribe(places => {
      this.loadedOffers = places;
    });
  }

  onEdit(offerId: string, ionSlide: IonItemSliding) {
    ionSlide.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

}
