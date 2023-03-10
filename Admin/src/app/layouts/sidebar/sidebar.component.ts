import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccService } from 'src/app/services/acc.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  accountInfor: any;
  isDisplay: boolean = false;
  titleModal: any;
  emailUpdate: any;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;

  constructor(
    private toastr: ToastrService,
    private Acc: AccService
  ) { }

  ngOnInit(): void {
    this.accountInfor = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
    this.emailUpdate = this.accountInfor.email;
  }

  showInfoModal(): void {
    this.isDisplay = true;
    this.titleModal = "Cập nhật thông tin cá nhân";
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }

  handleOk(): any {
    var req = {
      account_id: this.accountInfor.account_id,
      user_name: this.accountInfor.user_name,
      password: this.oldPassword,
      email: this.emailUpdate
    }
    if (!this.oldPassword && !this.confirmPassword) {
      this.toastr.warning('You must input full blank !');
      return false;
    } 
    else if (this.newPassword != this.confirmPassword) {
      this.toastr.warning('Confirm password not correctly !');
      return false;
    }
    this.Acc.login(req).subscribe((z) => {
      if (z.status == 200) {
        var req2 = {
          account_id: this.accountInfor.account_id,
          user_name: this.accountInfor.user_name,
          password: this.newPassword,
          email: this.emailUpdate
        }
        this.Acc.updatePassword(req2).subscribe((res) => {
          if (res.status == 200) {
            this.toastr.success('Cập nhật thông tin thành công !');
            this.accountInfor.email = this.emailUpdate;
            localStorage.setItem('UserInfo', JSON.stringify(this.accountInfor));
          }
          else {
            this.toastr.success('Cập nhật thông tin thất bại !');
          }
        });
      }
      else {
        this.toastr.warning('Mật khẩu cũ không đúng !');
      }
    });
    this.isDisplay = false;
  }
}
