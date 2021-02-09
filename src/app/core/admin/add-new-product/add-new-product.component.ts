import { Component, OnInit, TemplateRef } from '@angular/core';
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  //modal
  largemodal: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    let currentMultipleFile = undefined;
    // multiple dropzone file - accepts any type of file
    new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "https://",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-multiple"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
        .innerHTML,
      maxFiles: null,
      acceptedFiles: null,
      init: function() {
        this.on("addedfile", function(file) {
          if (currentMultipleFile) {
          }
          currentMultipleFile = file;
        });
      }
    });
    document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
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
