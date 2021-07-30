import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {Place} from '../../place.model';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {Subscription} from 'rxjs';
import {BookingService} from '../../../bookings/booking.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  subs: Subscription;

  constructor(private placesService: PlacesService,
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private bookingService: BookingService,
              private loadingCtrl: LoadingController,
              private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
      }
      this.subs = this.placesService.getPlace(paramMap.get('id')).subscribe(place => {
          this.place = place;
          this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  onBookPlace() {
      this.actionSheetCtrl.create({header: 'Choose an Action', buttons: [
          {
              text: 'Select Date',
              handler: () => {
                  this.openBookingModal('select');
              }
          },
          {
              text: 'Random Date',
              handler: () => {
                  this.openBookingModal('random');
              }
          },
          {
              text: 'Cancel',
              role: 'cancel'
          }
      ]}).then(actionSheetEl => {
          actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
      console.log(mode);
      this.modalCtrl
          .create({
              component: CreateBookingComponent,
              componentProps: { selectedPlace: this.place, selectedMode: mode}
          })
          .then(modalEl => {
              modalEl.present();
              return modalEl.onDidDismiss();
          })
          .then(resultData => {
              if (resultData.role === 'confirm') {
                   this.loadingCtrl.create({
                      message: 'Booking place...'
                  }).then(loadingEl => {
                      loadingEl.present();
                      const data = resultData.data.bookingData;
                      this.bookingService.addBooking(this.place.id, this.place.title, this.place.image, data.firsName, data.lastName, data.guestNumber, data.startDate, data.endDate)
                          .subscribe(() => {
                              loadingEl.dismiss();
                    });
                  });
              } else if (resultData.role === 'cancel') {
                  console.log('CANCELED!');
              }
          });
  }
 ngOnDestroy(): void {
      this.subs.unsubscribe();
 }
}
