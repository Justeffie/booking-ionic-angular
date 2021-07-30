import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {Booking} from './booking.model';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  bookingsSub: Subscription;

  constructor(private bookinsService: BookingService, private loadingCtr: LoadingController) { }

  ngOnInit() {
    this.bookingsSub = this.bookinsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ngOnDestroy(): void {
    this.bookingsSub.unsubscribe();
  }

  onDelete(id: string, slide: IonItemSliding) {
    slide.close();
    this.loadingCtr.create({
      message: 'Cancelling...'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookinsService.cancelBooking(id).subscribe(() =>
      loadingEl.dismiss());
    });
  }

}
