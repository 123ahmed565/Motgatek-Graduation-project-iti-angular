import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { User as userI } from '../models/users.interface';
import { BackEndService } from './back-end.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackEndService) { }

  user?: userI[];

  users: User[] = [
    new User(1, 'Ahmed', 'Sherif', [
      {
        id: 1, firstName: 'Ahmed', lastName: 'Sherif', city: 'New Damietta City', street: 'Street 1',
        governorate: 'Damietta', area: 'area 1', country: 'Egypt'
      },
      {
        id: 2, firstName: 'Ahmed', lastName: 'Sherif', city: 'Helwan', street: 'Street 2',
        governorate: 'Cairo', area: 'area 2', country: 'Egypt'
      }
    ],
      "", 'ahmed.sherif@gmail.com', '123', '01000690555', 'Male', 'Egyptian', new Date()),

    new User(2, 'Mohamed', 'Ali', [], "", 'khaled.sherif@gmail.com', '123', '12345678910', 'Male', 'Egyptian', new Date()),
  ];

  getAllusers() {
    return this.users;
  }

  setUserId(id: any) {
    localStorage.clear();
    localStorage.setItem('userId', id);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setAdminId(id: any) {
    localStorage.clear();
    localStorage.setItem('AdminId', id);
  }

  getAdminId() {
    return localStorage.getItem('AdminId');
  }

  getUserDetails(id: number) {
    return this.users.find(user => user.id == id);
  }

  saveNewAddress(id: number, address: any[]) {
    let editUser = this.users.find(user => user.id == id);
    editUser?.address.push(...address);
    if (editUser?.address.length == 1) {
      this.setDeliveryAddress(id, 0);
    }
  }

  setDeliveryAddress(id: number, addressIndex: number) {
    let user = this.getUserDetails(id);
    user!.deliveryAddress = user?.address[addressIndex];
  }

  getDeliveryAddress(id: number) {
    let user = this.getUserDetails(id);
    return user?.deliveryAddress;
  }

  updateAddress(id: number, addressId: number, newAddress: any) {
    let user = this.getUserDetails(id);
    let updateAddressIndex = user!.address.findIndex(address => address.id == addressId);
    user!.address.splice(updateAddressIndex, 1, newAddress);
  }

  deleteAddress(id: number, addressId: number) {
    let user = this.getUserDetails(id);
    let updateAddressIndex = user!.address.findIndex(address => address.id == addressId);
    user!.address.splice(updateAddressIndex, 1);
  }
}
