import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      displayname: [''],
      email: [''],
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      //console.log(res);
      if (res.status == 1) {
        this.signupForm.reset();
        alert("Registeration complete");
        this.router.navigate(['log-in']);
      }
    });
  }
}