import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import Quill from "quill";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {

  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  itemsPerSlide = 1;
  singleSlideOffset = true;
  // noWrap = true;
 
  slides = [
    {image: 'assets/img/product/1.jpg'},
    {image: 'assets/img/product/2.jpg'},
    {image: 'assets/img/product/3.jpg'},
    {image: 'assets/img/product/7.jpg'},
    {image: 'assets/img/product/5.jpg'},
    {image: 'assets/img/product/6.jpg'},
    // {image: 'assets/img/product/7.jpg'},
    // {image: 'assets/img/product/8.jpg'},
    // {image: 'assets/img/product/1.jpg'},
    // {image: 'assets/img/product/2.jpg'}
  ];
  constructor(
    private router: Router,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    var quill = new Quill("#quill", {
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["link", "blockquote", "code", "image"],
          [
            {
              list: "ordered"
            },
            {
              list: "bullet"
            }
          ]
        ]
      },
      placeholder: "Quill WYSIWYG",
      theme: "snow"
    });
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }  

  closeModal() {
    this.modal.hide()
  }

  goPage1() {
    this.router.navigate(['/pages/notification'])
  }

  goPageepriscription() {
    this.router.navigate(['/pages/e-priscription'])
  }
}
