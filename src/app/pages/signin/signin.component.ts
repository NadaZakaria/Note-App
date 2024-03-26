import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  apiError:string = ''
  hide = true;
  isLoading:boolean =  false

  constructor(private _AuthService:AuthService, private _Router:Router){}

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,18}$/)])
  })

  handleLogin(form:FormGroup):void{
    this.isLoading = true
    console.log(form);
    this._AuthService.signinAPI(form.value).subscribe({
      next:(res)=>{console.log(res);
        if(res.msg === "done"){
          localStorage.setItem('token', '3b8ny__'+res.token)
          this._AuthService.setUserToken()
          this._Router.navigate(['notes'])
        }
      },
      error:(err)=>{console.log(err);
        this.apiError = err.error.msg
        this.isLoading = false
      }
    })
    

  }


}

