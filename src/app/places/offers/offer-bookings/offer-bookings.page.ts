import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {Place} from '../../place.model';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  subs: Subscription;
  place: Place;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
          console.log();
          if (!params.has('id')) {
              this.navCtrl.navigateBack('/places/tabs/offers');
              return;
          }
          this.subs = this.placesService.getPlace(params.get('id')).subscribe(place => {
              this.place = place;
          });
      });
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }
}
