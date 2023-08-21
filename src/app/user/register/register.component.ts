import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { passwordsMatchValidator } from 'src/app/shared/validators/passwords-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
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
    this.registerForm = new FormGroup({
      'username': new FormControl('',[Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', [Validators.required, emailValidator()]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'rePass': new FormControl('', [Validators.required, Validators.minLength(6)]),

    },{ validators: passwordsMatchValidator() })
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password, rePass } = this.registerForm.value;
  
    this.isLoading = true;
    console.log(this.registerForm.value);
    this.userService.register(username, email, password).subscribe(
      {
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/']);
          this.registerForm.reset();

        }, error: errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      })
  }
 
}
