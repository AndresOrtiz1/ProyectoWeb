import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public myForm!: FormGroup;
  
    constructor(private fb:FormBuilder,private loginPrd:AutenticacionService) { }
  
    ngOnInit(): void {
      this.myForm = this.createMyForm();
    }

    private createMyForm():FormGroup{
      return this.fb.group({
        usuario:['',Validators.required],
        password:['',Validators.required]
      });
    }
    public submitFormulario(){
      if(this.myForm.invalid){
        Object.values(this.myForm.controls).forEach(control=>{
          control.markAsTouched();
        });
        return;
      }

      console.log(this.myForm.value);
      if(this.loginPrd.ingresarAplicativo(this.myForm.value)){
      
    }else{
    alert('Usuario o contraseña incorrectos');
    }
    }

      public get f():any{
        return this.myForm.controls;
      }



     
  }




  

