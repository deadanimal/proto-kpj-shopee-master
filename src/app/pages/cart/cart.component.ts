import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goPageCheckout() {
    this.router.navigate(['/pages/checkout'])
  }

}
