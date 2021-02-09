import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-administration-user',
  templateUrl: './administration-user.component.html',
  styleUrls: ['./administration-user.component.scss']
})
export class AdministrationUserComponent implements OnInit {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
  {
    name: "Tiger Nixon",
    typeDoc: "System Architect",
    office: "Edinburgh",
    clientId: "6134",
    date: "2011/04/25",
    salary: "$320,800",
    status: "success",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Garrett Winters",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "6342",
    date: "2011/07/25",
    salary: "$170,750",
    status: "cancel",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Ashton Cox",
    typeDoc: "Junior Technical Author",
    office: "San Francisco",
    clientId: "6656",
    date: "2009/01/12",
    salary: "$86,000",
    status: "success",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Cedric Kelly",
    typeDoc: "Senior Javascript Developer",
    office: "Edinburgh",
    clientId: "2287",
    date: "2012/03/29",
    salary: "$433,060",
    status: "cancel",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Airi Satou",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "3367",
    date: "2008/11/28",
    salary: "$162,700",
    status: "success",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Brielle Williamson",
    typeDoc: "Integration Specialist",
    office: "New York",
    clientId: "6189",
    date: "2012/12/02",
    salary: "$372,000",
    status: "cancel",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Herrod Chandler",
    typeDoc: "Sales Assistant",
    office: "San Francisco",
    clientId: "5964",
    date: "2012/08/06",
    salary: "$137,500",
    status: "cancel",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Rhona Davidson",
    typeDoc: "Integration Specialist",
    office: "Tokyo",
    clientId: "5512",
    date: "2010/10/14",
    salary: "$327,900",
    status: "success",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Colleen Hurst",
    typeDoc: "Javascript Developer",
    office: "San Francisco",
    clientId: "3978",
    date: "2009/09/15",
    salary: "$205,500",
    status: "cancel",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Sonya Frost",
    typeDoc: "Software Engineer",
    office: "Edinburgh",
    clientId: "2378",
    date: "2008/12/13",
    salary: "$103,600",
    status: "success",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Jena Gaines",
    typeDoc: "Office ManclientIdr",
    office: "London",
    clientId: "3056",
    date: "2008/12/19",
    salary: "$90,560",
    status: "success",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Quinn Flynn",
    typeDoc: "Support Lead",
    office: "Edinburgh",
    clientId: "2223",
    date: "2013/03/03",
    salary: "$342,000",
    status: "cancel",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Charde Marshall",
    typeDoc: "Regional Director",
    office: "San Francisco",
    clientId: "3906",
    date: "2008/10/16",
    salary: "$470,600",
    status: "success",
    email: "try@example.com",
    type: "Admin"
  },
  {
    name: "Haley Kennedy",
    typeDoc: "Senior Marketing Designer",
    office: "London",
    clientId: "4389",
    date: "2012/12/18",
    salary: "$313,500",
    status: "success",
    email: "try@example.com",
    type: "User"
  },
  {
    name: "Tatyana Fitzpatrick",
    typeDoc: "Regional Director",
    office: "London",
    clientId: "1939",
    date: "2010/03/17",
    salary: "$385,750",
    status: "cancel",
    email: "try@example.com",
    type: "Admin"
  },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    });
   }

  ngOnInit() {
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  successSwal() {
    swal.fire({
      title: "Saved",
      //text: "Successfully submitted",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
    this.modalRef.hide()
  }

  delete() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure to delete this?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.value) {
        this.doneDelete()
      }
    })
  }

  doneDelete() {
    swal.fire({
      title: "Success",
      text: "The data have been deleted!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close"
    })
    this.modalRef.hide()
  }

}
