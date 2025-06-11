import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAddService {
  public oculto: string = '';
  constructor() { }
  
  
  mostrarModal() {
    this.oculto = 'block';
  }
  ocultarModal(){
    this.oculto = '';
  }
}