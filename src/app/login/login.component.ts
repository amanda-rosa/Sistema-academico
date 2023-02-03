import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formCadastro!: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.formCadastro.get('confirmarSenha')?.addValidators([this.senha()])
  }

  createForm() {
    this.formCadastro = this.fb.group({
      usuario: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.maxLength(8)]],
      confirmarSenha: [null, [Validators.required, Validators.maxLength(8)]],
    });
    console.log(this.formCadastro.controls);
  }

  senha(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control?.value === this.formCadastro.get('senha')?.value ? null : { notEquals: true };
  }

  onSubmit() {
    console.log(this.formCadastro.getRawValue());
  }

  acessar() {
    if (!this.formCadastro.valid) {
      console.log("Senha inválida!");
      return;
    } else {
      console.log("Senha válida", this.formCadastro.value);
    }
  }
}