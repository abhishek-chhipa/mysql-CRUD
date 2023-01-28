import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  constructor(private service: ApiserviceService) {}

  readData: any;
  successmsg: any;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getUsers().subscribe((res) => {
      console.log('res==>', res);
      this.readData = res.data;
    });
  }

  deleteID(id: any) {
    this.service.deleteUser(id).subscribe((res) => {
      console.log('res==>', res.message);
      this.successmsg = res.message;
      // get users again and refresh the user list
      this.getAllUsers();
    });
  }
}
