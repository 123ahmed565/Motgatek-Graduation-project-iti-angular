import { Component, OnInit } from '@angular/core';
import { BackEndService } from 'src/app/services/back-end.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-whish-lists',
  templateUrl: './profile-wish-lists.component.html',
  styleUrls: ['./profile-wish-lists.component.css']
})
export class ProfileWishListsComponent implements OnInit {

  user: any;
  edit: boolean = true;

  constructor(private router: Router, private userService: UserService, private backendService: BackEndService) {
    if (this.userService.getUserId() == undefined) {
      this.router.navigate(['/login']);
    } else {
      this.backendService.getUser(this.userService.getUserId()).subscribe(
        res => {
          this.user = res;
        }
      );
    }
  }

  ngOnInit(): void {
  }
}
