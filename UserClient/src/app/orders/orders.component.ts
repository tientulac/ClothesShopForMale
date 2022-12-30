import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent extends BaseComponent implements OnInit {

  orderByAccount: any;
  account_id: any;
  listOrderItem: any;

  ngOnInit(): void {
    this.account_id = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))).account_id;
    this.getListOrderByAccount();
  }

  getListOrderByAccount() {
    this.orderService.getList().subscribe(
      (res) => {
        this.orderByAccount = res.data.filter((x: any) => x.account_id == this.account_id);
      }
    )
  }

  closeResult: any;
  open(Data: any) {
    this.selected_ID = Data.order_id;
    this.submitted = false;
    this.titleModal = 'Chi tiết đơn hàng';
    this.listOrderItem = JSON.parse(JSON.parse(JSON.stringify(Data.order_item)));
  }

  cancleOrder(id: any) {
    this.orderService.cancleOrder(id).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Successfully !');
          this.getListOrderByAccount();
        }
        else {
          this.toastr.warning('Failed !');
        }
      }
    );
  }

  exportOrder() {
    var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow?.document.write('<html><head><title>my div</title>');
        /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow?.document.write('</head><body >');
        mywindow?.document.write(`<table style= class="table table-bordered">
        <caption>List of users</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>`);
        mywindow?.document.write('</body></html>');
        mywindow?.print();
        mywindow?.close();
  }
}
