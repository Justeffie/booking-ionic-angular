import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {User} from "./user.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = false;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  // onLogin() {
  //   this.loadingCtrl.create({
  //      keyboardClose: true, message: 'Loggin in...'})
  //       .then(loadingEl => {
  //         loadingEl.present();
  //         setTimeout(() => {
  //               this.isLoading = false;
  //               loadingEl.dismiss();
  //               this.router.navigateByUrl('/places');
  //           }, 1000);
  //       });
  //   this.isLoading = true;
  // }

    onSubmit(formElement: NgForm) {
        if (formElement.invalid) {
            return;
        }
        const email = formElement.value.email;
        const pass = formElement.value.password;
        const user = new User(email, pass);
        console.log(user);
        if (this.isLogin) {
            this.authService.login(user);
            console.log(user);
            this.router.navigateByUrl('/places');
        } else {
           this.authService.addUser(user);
            console.log(user);
        }
    }

    onSwitchAuthMode() {
      this.isLogin = !this.isLogin;
    }
}
