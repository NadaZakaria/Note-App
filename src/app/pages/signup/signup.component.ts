import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/core/interfaces/user-data';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hide = true;
  apiError:string = ''
  isLoading:boolean =  false

  constructor(private _AuthService:AuthService , private _Router:Router){}

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required , Validators.minLength(3)]),
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('', [Validators.required , Validators.pattern(/^[A-Za-z0-9]{3,12}$/)]),
    phone: new FormControl('',[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    age : new FormControl('',[Validators.required])

  })

  handleForm(form:FormGroup):void{
    console.log(form);
    this.isLoading = true
    this._AuthService.signupAPI(form.value).subscribe({
      next: (res)=>{
        if(res.msg ==="done"){
          this._Router.navigate(['signin'])
        }
      },
      error:(err)=>{
        this.apiError = err.error.msg
        this.isLoading = false
      }
    })
    
  }

}
