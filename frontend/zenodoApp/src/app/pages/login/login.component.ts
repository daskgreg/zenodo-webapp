import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    hide: boolean = false;

    usernameIsWrong: boolean = false;
    usernameIsRequired:boolean = false;
    passwordIsRequired: boolean = false;
    passwordIsWrong: boolean = false;

    usernameInput:String = '';
    passwordInput:String = '';

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService:AuthenticationService  ) {

        this.loginForm = new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required])
        });
 
  }

  ngOnInit() {
  }

  usernameFunc(event: any){
    if(event) this.usernameIsRequired = false;
  }
  passwordFunc(event: any){
    if(event) this.passwordIsRequired = false;
  }

  onLogin() {
    if(!this.loginForm.value.username){
      this.usernameIsRequired = true;
    }
    if(!this.loginForm.value.password){
      this.passwordIsRequired = true;
    }
    if (!this.loginForm.valid) {
      return;
    }
  }


}
