import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute
  ) {}

  errorMessage: any;
  successMessage: any;
  getParamID: any;

  ngOnInit(): void {
    // console.log(this.router.snapshot.paramMap.get('id'),"getid");
    this.getParamID = this.router.snapshot.paramMap.get('id');
    if(this.getParamID){
      this.service.getSingleUser(this.getParamID).subscribe((res: any) => {
        console.log('paramidres==>', res);

        // to prepopulate the form feilds
        this.userForm.patchValue({
          fullname: res.data[0].fullname,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
        });
      });
    }
    
  }

  userForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
  });

  // Create new user

  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value, 'formsubmitdata');
      this.service.createUser(this.userForm.value).subscribe((res) => {
        console.log(res);
        this.userForm.reset();
        this.successMessage = res.message;
      });
    } else {
      this.errorMessage = 'All feilds are required !';
    }
  }

  // Update existing user

  userUpdate(){

    console.log(this.userForm.value,"updated");
    if(this.userForm.valid){
      this.service.updateUser(this.getParamID,this.userForm.value).subscribe(res=>{
        console.log(res);
        this.successMessage = res.message;
        this.userForm.reset();
      })

    }else
    {
      this.errorMessage = 'All feilds are required!';
    }

  }
}
