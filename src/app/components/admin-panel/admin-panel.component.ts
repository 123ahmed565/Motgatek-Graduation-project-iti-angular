import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BackEndService } from 'src/app/services/back-end.service';
import { UserService } from 'src/app/services/user.service';

import { Subscription } from 'rxjs';
import { AppConfigService } from '../../services/appconfigservice';
import { AppConfig } from '../../domain/appconfig';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  admin: any;
  nameLabel: string = "";
  adminLoged: boolean = false;
  items: MenuItem[];
  usersList: any[] = [];
  adminsList: any[] = [];
  users: any;
  phonesList: any[] = [];
  tvsList: any[] = [];
  laptopsList: any[] = [];
  headphonesList: any[] = [];
  products: any;
  pendingList: any[] = [];
  outForDeliveryList: any[] = [];
  deliveredList: any[] = [];
  returnedList: any[] = [];
  orders: any;
  profits: number = 0;

  // chartOptions: any;
  // subscription: Subscription;
  // config: AppConfig;

  constructor(private userService: UserService, private backendService: BackEndService, public router: Router, private configService: AppConfigService) {

    if (this.userService.getAdminId() != undefined) {
      this.backendService.getUser(this.userService.getAdminId()).subscribe(res => {
        this.admin = res;
        this.adminLoged = true;
        this.nameLabel = `${this.admin.firstName} ${this.admin.lastName}`;

        this.backendService.getAllUsers().subscribe(
          res => {
            let result = res as Array<any>;
            this.adminsList = result.filter(user => user.isAdmin == true);
            this.usersList = result.filter(user => user.isAdmin == false);
            this.users = {
              labels: ['USERS', 'ADMINS'],
              datasets: [
                {
                  data: [this.usersList.length, this.adminsList.length],
                  backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                  ],
                  hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                  ]
                }
              ]
            };
          }
        );

        this.backendService.getAllProducts().subscribe(
          res => {
            let result = res as Array<any>;
            this.phonesList = result.filter(product => product.category.name == "phones");
            this.tvsList = result.filter(product => product.category.name == "laptops");
            this.laptopsList = result.filter(product => product.category.name == "televisions");
            this.headphonesList = result.filter(product => product.category.name == "headphones");
            this.products = {
              labels: ['Phones', 'Laptops', 'TVs', 'Headphones'],
              datasets: [
                {
                  data: [this.phonesList.length, this.laptopsList.length, this.tvsList.length, this.headphonesList.length],
                  backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    "#7E57C2",
                  ],
                  hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D",
                    "#A067C3",
                  ]
                }
              ]
            };
          }
        );

        this.backendService.getAllOrders().subscribe(
          res => {
            let result = res as Array<any>;
            this.pendingList = result.filter(order => order.status == "pending");
            this.outForDeliveryList = result.filter(order => order.status == "out for delivery");
            this.deliveredList = result.filter(order => order.status == "delivered");
            console.log(this.deliveredList);
            this.deliveredList.forEach(order => this.profits += order.totalPrice);
            this.returnedList = result.filter(order => order.status == "returned");
            this.orders = {
              labels: ['Pending', 'OUT FOR DELIVERY', 'DELIVERED', 'RETURNED'],
              datasets: [
                {
                  data: [this.pendingList.length, this.outForDeliveryList.length, this.deliveredList.length, this.returnedList.length],
                  backgroundColor: [
                    "#FFA726",
                    "#42A5F5",
                    "#66BB6A",
                    "#A6A6A6",
                  ],
                  hoverBackgroundColor: [
                    "#FFB74D",
                    "#64B5F6",
                    "#81C784",
                    "#BFBFBF",
                  ]
                }
              ]
            };
          }
        );
      });

    } else {
      this.router.navigate(['/home']);
    }

    this.items = [
      {
        label: 'USERS',
        icon: 'pi pi-fw pi-user',
        routerLink: './users'
      },
      {
        label: 'CATEGORIES',
        icon: 'pi pi-fw pi-th-large',
        items: [
          {
            label: 'New Category',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: './new-category'

          },
          {
            label: 'All Categories',
            icon: 'pi pi-fw pi-bars',
            routerLink: './categories'

          },
        ]
      },
      {
        label: 'PRODUCTS',
        icon: 'pi pi-fw pi-tag',
        items: [
          {
            label: 'New Product',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: './new-product'
          },
          {
            label: 'All Products',
            icon: 'pi pi-fw pi-tags',
            routerLink: './products'
          },
        ]
      },
      {
        label: 'ORDERS',
        icon: 'pi pi-shopping-cart',
        routerLink: './orders'
      },
    ];
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    localStorage.removeItem('adminId');
  }
}
