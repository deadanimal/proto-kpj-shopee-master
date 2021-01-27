import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-e-priscription',
  templateUrl: './e-priscription.component.html',
  styleUrls: ['./e-priscription.component.scss']
})
export class EPriscriptionComponent implements OnInit {

  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    public toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }  

  closeModal() {
    this.modal.hide()
  }

  showNotification(type) {
    this.toastr.show(
      '<div class="alert-text"</div> <span data-notify="message">This product have been added into your cart</span></div>',
      "",
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-success alert-notify"
      }
    );
  }

}
