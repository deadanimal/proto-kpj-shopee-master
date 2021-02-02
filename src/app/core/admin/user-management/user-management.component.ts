import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/assets/mock/admin-user/users.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: User[] = []
  SelectionType = SelectionType;

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      username: "john_cena",
      firstname: "John",
      lastname: "Cena",
      email: "john_cena123@try.com",
      roles: "Admin"
    },
    {
      username: "under_taker",
      firstname: "Under",
      lastname: "Taker",
      email: "under_taker93@try.com",
      roles: "Developer"
    },
    {
      username: "kane_boseman",
      firstname: "Kane",
      lastname: "Boseman",
      email: "john_cena75@try.com",
      roles: "Finance"
    },
    {
      username: "harry_kane",
      firstname: "Harry",
      lastname: "Kane",
      email: "kane_boseman23@try.com",
      roles: "HR"
    },
    {
      username: "ibra_himovic",
      firstname: "Zlatan",
      lastname: "Ibrahimovic",
      email: "ibra_himovic56@try.com",
      roles: "Runner"
    },
    {
      username: "c_ronaldo",
      firstname: "Cristiano",
      lastname: "Ronaldo",
      email: "c_ronaldo07@try.com",
      roles: "Developer"
    },
    {
      username: "william_martin",
      firstname: "William",
      lastname: "Martin",
      email: "william_martin34@try.com",
      roles: "Admin"
    },
    {
      username: "laila_majnun",
      firstname: "Laila",
      lastname: "Majnun",
      email: "laila_majnun467@try.com",
      roles: "HR"
    },
    {
      username: "maslinda_rahim",
      firstname: "Maslinda",
      lastname: "Rahim",
      email: "maslinda_rahim579@try.com",
      roles: "Finance"
    },
    {
      username: "ahmad_ali",
      firstname: "Ahmad",
      lastname: "Ali",
      email: "ahmad_ali94@try.com",
      roles: "Developer"
    },
    {
      username: "chew_min",
      firstname: "Chew",
      lastname: "Min",
      email: "chew_min19@try.com",
      roles: "Finance"
    },
    {
      username: "arumugam_krish",
      firstname: "Arumugam",
      lastname: "Krish",
      email: "arumugam_krish76@try.com",
      roles: "Admin"
    },
    {
      username: "chan_sow",
      firstname: "Chan Sow",
      lastname: "Lin",
      email: "chan_sow03@try.com",
      roles: "HR"
    },
    {
      username: "kim_jong",
      firstname: "Kim",
      lastname: "Jong Kok",
      email: "kim_jong87@try.com",
      roles: "Runner"
    },
    {
      username: "k_jamal",
      firstname: "Khairi",
      lastname: "Jamal",
      email: "john_cena123@try.com",
      roles: "Developer"
    },
    
  ];

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    private modalService: BsModalService,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
   }

  ngOnInit() {
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  successSwal() {
    swal.fire({
      title: "Success",
      text: "New user created",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
  }

}
