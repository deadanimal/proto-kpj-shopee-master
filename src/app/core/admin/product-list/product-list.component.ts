import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  //modal
  largemodal: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  lgModal(template: TemplateRef<any>) {
    this.largemodal = this.modalService.show(template, {class: 'modal-lg'});
  }

  successSwal() {
    swal.fire({
      title: "Saved",
      //text: "Successfully submitted",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
    this.largemodal.hide()
  }

}
