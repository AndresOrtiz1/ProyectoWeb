import { Component, HostBinding, IterableDiffers, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes.models';
import { ClientesService } from '../../services/clientes.service'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  template: `
    <button (click)="imprimir()">Imprimir</button>
  `
})
export class ClientesComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
  

  cliente: Clientes = {
    id: 0,
    nombresCliente: '',
    apellidosCliente: '',
    cedulaCliente: '',
    correoCliente: '',
    edadCliente: '',
    direccionCliente: '',
    telefonoCliente: ''
  }

  clientesArr: any = []; 
  edit : boolean = true;
  constructor(
    private ClientesServicesService: ClientesService,
    private router: Router , private activatedRoute : ActivatedRoute) {
    }
    
  ngOnInit() {
    this.getMP(); 
  }



  
  // metodos del componetne CRUD
  saveNewMP() {
    delete this.cliente.id;
    this.ClientesServicesService.saveClientes(this.cliente).subscribe({
      next: (v: any) => [this.cliente = v,this.edit = false ],
      error: (e: any) => console.error(e),
      complete: () => ( this.getMP())
    })
  }

  getMP() {
    this.ClientesServicesService.getClienteslist().subscribe({
      next: (v: any) => this.clientesArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  deleteMP(id: any) {
    this.ClientesServicesService.deleteClientes(id).subscribe({
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.ClientesServicesService.getClientes(id).subscribe({
      next: (v: any) => [[this.cliente] = v, this.edit = true, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get cliente complete'+id)
    })
  }

  updateMP(id: any){
    this.ClientesServicesService.updateClientes(id,this.cliente).subscribe({
      next: (v: any) => [this.cliente, console.log(v), console.log([this.cliente], this.cliente), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
  }

  reset(){
    this.cliente.id= 0;
    this.cliente.nombresCliente = '';
    this.cliente.apellidosCliente = '';
    this.cliente.cedulaCliente = '';
    this.cliente.correoCliente = '';
    this.cliente.edadCliente = '';
    this.cliente.direccionCliente = '';
    this.cliente.telefonoCliente = '';
    
  }
  //validaciones



// validar cedula 
validarCedulaCliente(cedulaCliente: string): boolean {
  // validacion de cedula conste de 10 numeros
  return /^([0-9]{10})$/.test(cedulaCliente);
}

validarCedulaClienteAlerta(cedulaCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCedulaCliente(cedulaCliente)) {
    const element = document.querySelector('.errCed') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCed') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCed') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCed') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

// validar Nombre 
validarNombreCliente(nombresCliente: string): boolean {
  // solo tiene letras y no numeros
  return /^([A-Za-z ]{2,25})$/.test(nombresCliente);
}

validarNombreClienteAlerta(nombresCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarNombreCliente(nombresCliente)) {
    const element = document.querySelector('.errNc') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valNc') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errNc') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valNc') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarApellidoCliente(apellidosCliente: string): boolean {
  // los apellidos deben tener 2 letras  mayusculas y las demas minusculas
  return /^([A-Za-z ]{2,25})$/.test(apellidosCliente);
}

validarApellidoClienteAlerta(apellidosCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarApellidoCliente(apellidosCliente)) {
    const element = document.querySelector('.errAp') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valAp') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errAp') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valAp') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCorreoCliente(correoCliente: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(correoCliente);
}

validarCorreoClienteAlerta(correoCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCorreoCliente(correoCliente)) {
    const element = document.querySelector('.errCrr') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCrr') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCrr') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCrr') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
validarEdadCliente(edadCliente: string): boolean {
  
  return /^([0-9]{3})$/.test(edadCliente);
}

validarEdadClienteAlerta(edadCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarEdadCliente(edadCliente)) {
    const element = document.querySelector('.errEdd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valEdd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errEdd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valEdd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
validarDireccionCliente(direccionCliente: string): boolean {
  
  return /^([A-Za-z ]{2,50})$/.test(direccionCliente);
}

validarDireccionClienteAlerta(direccionCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarDireccionCliente(direccionCliente)) {
    const element = document.querySelector('.errDir') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valDir') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errDir') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valDir') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
validarTelefonoCliente(telefonoCliente: string): boolean {
  
  return /^([0-9]{10})$/.test(telefonoCliente);
}

validarTelefonoClienteAlerta(telefonoCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarTelefonoCliente(telefonoCliente)) {
    const element = document.querySelector('.errTel') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valTel') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errTel') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valTel') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}


/// validacion EDIT    -------------------------------------------------

// validar cedula 
validarCedulaClienteED(cedulaCliente: string): boolean {
  // validacion de cedula conste de 10 numeros
  return /^([0-9]{10})$/.test(cedulaCliente);
}

validarCedulaClienteAlertaED(cedulaCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCedulaClienteED(cedulaCliente)) {
    const element = document.querySelector('.errCedED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCedED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCedED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCedED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
//EDICION VALIDACIONES
// validar Nombre 
validarNombreClienteED(nombresCliente: string): boolean {
  // solo tiene letras y no numeros
  return /^([A-Za-z ]{2,25})$/.test(nombresCliente);
}

validarNombreClienteAlertaED(nombresCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarNombreClienteED(nombresCliente)) {
    const element = document.querySelector('.errNcED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valNcED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errNcED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valNcED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarApellidoClienteED(apellidosCliente: string): boolean {
  // los apellidos deben tener 2 letras  mayusculas y las demas minusculas
  return /^([A-Za-z ]{2,25})$/.test(apellidosCliente);
}

validarApellidoClienteAlertaED(apellidosCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarApellidoClienteED(apellidosCliente)) {
    const element = document.querySelector('.errApED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valApED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errApED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valApED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCorreoClienteED(correoCliente: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(correoCliente);
}

validarCorreoClienteAlertaED(correoCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCorreoClienteED(correoCliente)) {
    const element = document.querySelector('.errCrrED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCrrED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCrrED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCrrED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
validarEdadClienteED(edadCliente: string): boolean {
  
  return /^([0-9]{3})$/.test(edadCliente);
}

validarEdadClienteAlertaED(edadCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarEdadClienteED(edadCliente)) {
    const element = document.querySelector('.errEddED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valEddED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errEddED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valEddED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
validarDireccionClienteED(direccionCliente: string): boolean {
  
  return /^([A-Za-z ]{2,50})$/.test(direccionCliente);
}

validarDireccionClienteAlertaED(direccionCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarDireccionClienteED(direccionCliente)) {
    const element = document.querySelector('.errDirED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valDirED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errDirED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valDirED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
validarTelefonoClienteED(telefonoCliente: string): boolean {
  
  return /^([0-9]{10})$/.test(telefonoCliente);
}

validarTelefonoClienteAlertaED(telefonoCliente: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarTelefonoClienteED(telefonoCliente)) {
    const element = document.querySelector('.errTelED') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valTelED') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errTelED') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valTelED') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}


/// inpresion de reportes 
 
}
