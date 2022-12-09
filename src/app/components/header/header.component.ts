import { Component, OnInit } from '@angular/core';
import { ApibackendService } from 'src/app/services/apibackend.service';
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  constructor(public authService: AuthService,
    public backend: ApibackendService) {}

  ngOnInit(): void {
    this.backend.getMyUserName();
  }

  logout() {
    this.authService.doLogout();
  }

}
