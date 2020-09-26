import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonService } from '../common.service';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string = 'admin';
  username = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  password = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  addusername = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  addpassword = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  login:boolean = true;
  previousUrl: string;
  constructor(public commonService:CommonService,public authService: AuthService,public router: Router) {
    if(authService.isLoggedIn()){
      router.navigate(['/']);
    }
  }

  ngOnInit() {
    
  }
  
  noWhitespaceValidator(control: FormControl) {
    let fCon:any = control || ""
    const isWhitespace = (fCon.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  userLogin(){
    if(this.username.hasError('required') || this.password.hasError('required') || this.username.hasError('whitespace') || this.password.hasError('whitespace')){
      Swal.fire('Oops...', 'Username and password are required!', 'error')
    }else{
      let reqBody = {
        username:this.username.value,
        password: this.password.value
      }
      this.commonService._post('auth/login',reqBody,(res)=>{
          if(res.statusCode === 206){
            Swal.fire('Oops...',res.message, 'error');
          }else{
            this.authService.login(res.response.ACCESS_TOKEN,res.response.role);
            if (res.response.role === 'admin')
              this.router.navigate(['/admin-dashboard']);
            else
              this.router.navigate(['/home']);
          }
      },(err)=>{
        console.log(err);
        
       Swal.fire('Oops...', 'Something went wrong!', 'error');
      });
    }
  }

  userRegister(){
    if(this.addusername.hasError('required') || this.addpassword.hasError('required') || this.addusername.hasError('whitespace') || this.addpassword.hasError('whitespace')){
      Swal.fire('Oops...', 'Username and password are required!', 'error');
    }else{
       let reqBody = {
         username:this.addusername.value,
         password: this.addpassword.value,
         type:this.user
       }
       this.commonService._post('auth/register',reqBody,(res)=>{
        if(res.statusCode === 206){
          Swal.fire('Oops...',res.message, 'error');
        }else{
          this.login = true;
          Swal.fire('Congratulations...',res.message, 'success');
        }
       },(err)=>{
         console.log(err);
         
        Swal.fire('Oops...', 'Something went wrong!', 'error');
       });
    }
  }
}
