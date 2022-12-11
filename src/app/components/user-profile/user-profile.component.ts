import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {
  currentUser: any = {};
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {

    this.signupForm = this.fb.group({
      display_name: [''],
      email: [''],
      username: [''],
      reference: [''],
    });
    
    this.authService.getMe().subscribe((res) => {
      //console.log(res);
      if (res.status == 1 )
        this.currentUser = res.info;
        this.signupForm.setValue({
          "display_name" : this.currentUser.display_name,
          "username" : this.currentUser.username,
          "reference" : this.currentUser.user_id,
          "email" : this.currentUser.email,
        });
    });
  }

  ngOnInit() {}

  saveprofile()
  {
    //console.log("123")
    //console.log(this.signupForm.value)
    this.authService.changeuser(this.signupForm.value).subscribe((res) => {
      //console.log(res);
      if (res.status == 1) {
        //this.signupForm.reset();

        localStorage.setItem("display_name",  res.info.display_name);
        
        alert("Profile updated");
        
      }
      else if (res.status == 2)
      {
        alert("User already exists");
      }
      else 
      {
        alert("Invalid input");
      }
    });
  }
}
