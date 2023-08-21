import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isLoading = false;
  error: string | undefined;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, emailValidator()]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe(
      {
        next: (resData) => {

          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/']);
          this.loginForm.reset()

        }, error: errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage
          this.isLoading = false;
        }
      });
  }
}
