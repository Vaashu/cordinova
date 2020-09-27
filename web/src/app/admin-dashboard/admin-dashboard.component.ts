import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  addProductform: FormGroup;
  categories = ["computer","fruits","vegetables"];
  constructor(public commonService:CommonService) { 
    
  }

  ngOnInit() {
    this.addProductform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"),]),
      category: new FormControl("", Validators.required)
    });
  }
  
get f(){
    return this.addProductform.controls;
}
 
submit(){
   if(this.addProductform.status === 'VALID'){
      this.commonService._post('admin/add-product',this.addProductform.value,(res)=>{
        if(res.success){
          this.resetValue();
          Swal.fire('Congratulations...',res.message, 'success');
        }else{
          Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
      },()=>{

      })
  }else{
      Swal.fire('Oops...', 'All fiels are required!', 'error');
  }
}

resetValue(){
    this.addProductform.reset({name: '', price: '',category: ''});
}
}
