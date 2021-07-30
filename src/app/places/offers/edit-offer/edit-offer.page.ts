import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {LoadingController, NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {Place} from '../../place.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  id: string;
  form: FormGroup;
  subs: Subscription;
  place: Place;
  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private placeService: PlacesService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        if (!params.has('id')) {
            this.navCtrl.navigateBack('/places/tabs/offers');
            return;
        }
        this.subs = this.placeService.getPlace(params.get('id')).subscribe(place => {
            this.place = place;
            this.form = new FormGroup({
                title: new FormControl(this.place.title, {
                    updateOn: 'blur',
                    validators: [Validators.required]
                }),
                description: new FormControl(this.place.description, {
                    updateOn: 'blur',
                    validators: [Validators.required, Validators.maxLength(180)]
                }),
                price: new FormControl(this.place.price, {
                    updateOn: 'blur',
                    validators: [Validators.required]
                }),
            });
        });
    });
  }

    onUpdateOffer() {
      if (this.form.invalid) {
          return;
      }
      this.loadingCtrl.create({
          message: 'Updating place...'
      }).then(loading => {
          this.placeService.updateOffer(
              this.place.id,
              this.form.value.title,
              this.form.value.description,
              this.form.value.price
          ).subscribe(() => {
              loading.dismiss();
              this.form.reset();
              this.router.navigateByUrl('/places/tabs/offers');
          });
      });
    }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
