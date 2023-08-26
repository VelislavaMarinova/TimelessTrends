import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { customValidators } from 'src/app/shared/validators/customValidators';

let customValidatorsFn = customValidators()
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
      'username': new FormControl('', [Validators.required, Validators.minLength(3), customValidatorsFn.noSpaceValidator()]),
      'email': new FormControl('', [Validators.required, customValidatorsFn.email(),customValidatorsFn.noSpaceValidator()]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'rePass': new FormControl('', [Validators.required, Validators.minLength(6)]),

    }, { validators: customValidatorsFn.passwordsMatch() })
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password, rePass } = this.registerForm.value;

    this.isLoading = true;
    this.userService.register(username, email, password).subscribe(
      {
        next: (resData) => {
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
