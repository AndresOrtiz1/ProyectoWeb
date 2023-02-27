import { Component, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Proveedores } from 'src/app/models/proveedores.models';
import { ProveedoresService } from '../../services/proveedores.service'
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  template: `
    <button (click)="imprimir()">Imprimir</button>
  `
})
export class ProveedoresComponent implements OnInit{
  
  @HostBinding('class') classes = 'modal-body';
  API_URI = 'http://localhost:3000/api';

  provee: Proveedores= {
    id: 0,
    codigo: '',
    NombreApellido:'',
    Cedula: '',
    NumeroCelular: '',
    CorreoElectronico: '',
    Direccion: '',
    NombreEmpresa: '',
    TelefonoEmpresa: '',
    DireccionEmpresa: '',
    CorreoEmpresa: ''
  }

  proveedoresArr: any = [];
  codigo!: number;
  fechaActual: Date;
  edit : boolean = true;
  constructor(
    private ProveedoresService: ProveedoresService, private router: Router , private activatedRoute : ActivatedRoute) 
    {
    this.fechaActual = new Date();
  }
  
  ngOnInit() {
    this.codigo = Math.floor(10000 + Math.random() * 90000);
    this.getMP();
  }

  imprimir(): void {
    window.print();
  }

  saveNewMP() {
     
    delete this.provee.id;

    this.ProveedoresService.saveProveedores(this.provee).subscribe({
      next: (v: any) => [this.provee = v,this.edit = false ],
      error: (e: any) => console.error(e),
      complete: () => ( this.getMP())
    })
  }

  getMP() {
    this.ProveedoresService.getProveedoreslist().subscribe({
      next: (v: any) => this.proveedoresArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
      
    })
  }

  deleteMP(id: any) {
    this.ProveedoresService.deleteProveedores(id).subscribe({
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.ProveedoresService.getProveedores(id).subscribe({
      next: (v: any) => [[this.provee] = v, this.edit = true, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get proveedores complete'+id)
    })


  }

  updateMP(id: any){
    this.ProveedoresService.updateProveedores(id,this.provee).subscribe({
      next: (v: any) => [this.provee, console.log(v), console.log([this.provee], this.provee), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
     
     
  }

  reset(){
    this.provee.id= 0;
    this.provee.codigo = '';
    this.provee.NombreApellido='';
    this.provee.Cedula='';
    this.provee.NumeroCelular='';
    this.provee.CorreoElectronico='';
    this.provee.Direccion='';
    this.provee.NombreEmpresa='';
    this.provee.TelefonoEmpresa='';
    this.provee.DireccionEmpresa='';
    this.provee.CorreoEmpresa='';
  }

// validar codigo 
  validarCodigo(codigo: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([A-Z]{2})([0-9]{3})$/.test(codigo);
  }

  validarCodigoAlerta(codigo: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCodigo(codigo)) {
      const element = document.querySelector('.errC') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valC') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errC') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valC') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  // validar Nombre 
  validarNombre(NombreApellido: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([A-Z a-z]{2,25})([ ])([A-Z a-z]{2,25})$/.test(NombreApellido);
  }

  validarNombreAlerta(NombreApellido: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarNombre(NombreApellido)) {
      const element = document.querySelector('.errN') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valN') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errN') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valN') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarCedula(Cedula: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^[0-9]{10}$/.test(Cedula);
  }

  validarCedulaAlerta(Cedula: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCedula(Cedula)) {
      const element = document.querySelector('.errC') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valC') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errC') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valC') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarCelular(NumeroCelular: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^\+593\ ([0-9]){9}$/.test(NumeroCelular);
  }

  validarCelularAlerta(NumeroCelular: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCelular(NumeroCelular)) {
      const element = document.querySelector('.errCel') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valCel') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errCel') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valCel') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarCorreo(CorreoElectronico: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(CorreoElectronico);
  }

  validarCorreoAlerta(CorreoElectronico: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCorreo(CorreoElectronico)) {
      const element = document.querySelector('.errCorr') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valCorr') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errCorr') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valCorr') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }
  
  // validar Nombre Empresa
  validarNombreEmpresa(NombreEmpresa: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([A-Za-z ]{1,25})$/.test(NombreEmpresa);
  }

  validarNombreEmpresaAlerta(NombreEmpresa: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarNombreEmpresa(NombreEmpresa)) {
      const element = document.querySelector('.errNem') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valNem') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errNem') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valNem') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarCorreoEmpresa(CorreoEmpresa: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(CorreoEmpresa);
  }
  
  validarCorreoEmpresaAlerta(CorreoEmpresa: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCorreoEmpresa(CorreoEmpresa)) {
      const element = document.querySelector('.errCem') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valCem') as HTMLElement;
      element2.style.display = "none";
  
      return false;
    } else {
      const element = document.querySelector('.errCem') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valCem') as HTMLElement;
      element2.style.display = "block";
  
      return true;
    }
  }

  validarTelefonoEmpresa(TelefonoEmpresa: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^02\ [0-9]{7}$/.test(TelefonoEmpresa);
  }

  validarTelefonoEmpresaAlerta(TelefonoEmpresa: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarTelefonoEmpresa(TelefonoEmpresa)) {
      const element = document.querySelector('.errTem') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valTem') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errTem') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valTem') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

/// validacion EDIT    -------------------------------------------------

validarCodigoEd(codigo: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([A-Z]{2})([0-9]{3})$/.test(codigo);
}

validarCodigoAlertaEd(codigo: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCodigoEd(codigo)) {
    const element = document.querySelector('.errCEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarNombreEd(NombreApellido: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([A-Z a-z]{2,25})([ ])([A-Z a-z]{2,25})$/.test(NombreApellido);
}

validarNombreAlertaEd(NombreApellido: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarNombreEd(NombreApellido)) {
    const element = document.querySelector('.errNEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valNEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errNEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valNEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCedulaEd(Cedula: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^[0-9]{10}$/.test(Cedula);
}

validarCedulaAlertaEd(Cedula: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCedulaEd(Cedula)) {
    const element = document.querySelector('.errCEdula') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCEdula') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCEdula') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCEdula') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCelularEd(NumeroCelular: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^\+593\ ([0-9]){9}$/.test(NumeroCelular);
}

validarCelularAlertaEd(NumeroCelular: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCelularEd(NumeroCelular)) {
    const element = document.querySelector('.errCelEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCelEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCelEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCelEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCorreoEd(CorreoElectronico: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(CorreoElectronico);
}

validarCorreoAlertaEd(CorreoElectronico: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCorreoEd(CorreoElectronico)) {
    const element = document.querySelector('.errCorrEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCorrEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCorrEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCorrEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

// validar Nombre Empresa
validarNombreEmpresaEd(NombreEmpresa: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([A-Za-z ]{2,25})$/.test(NombreEmpresa);
}

validarNombreEmpresaAlertaEd(NombreEmpresa: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarNombreEmpresaEd(NombreEmpresa)) {
    const element = document.querySelector('.errNemEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valNemEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errNemEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valNemEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCorreoEmpresaEd(CorreoEmpresa: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(CorreoEmpresa);
}

validarCorreoEmpresaAlertaEd(CorreoEmpresa: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCorreoEmpresaEd(CorreoEmpresa)) {
    const element = document.querySelector('.errCemEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCemEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCemEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCemEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarTelefonoEmpresaEd(TelefonoEmpresa: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^02\ [0-9]{7}$/.test(TelefonoEmpresa);
}

validarTelefonoEmpresaAlertaEd(TelefonoEmpresa: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarTelefonoEmpresaEd(TelefonoEmpresa)) {
    const element = document.querySelector('.errTemEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valTemEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errTemEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valTemEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

}
