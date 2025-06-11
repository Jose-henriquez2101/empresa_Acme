import { Component, OnInit } from '@angular/core';
import { ModalAddService } from '../modal-add.service';
import { FormGroup, FormBuilder, Validators, AsyncValidator, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css'
})
export class ModalAddComponent{
  formProduct: FormGroup;
  constructor(public modalAddService: ModalAddService, private formBuilder: FormBuilder, private productService: ProductService) { 
    this.formProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(8)], [this.codeValidator()]],
      date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      starRating: ['', [Validators.required]],
      image: ['']
    });
  }
  ocultarModal(){
    this.modalAddService.ocultarModal();
  }
  saveData(){
    const producto = this.formProduct.value;
    this.productService.saveProduct(producto).subscribe(() =>{
      return this.productService.getProducts().subscribe((res:any[])=>{
        this.productService.products = res;
        this.productService.filteredProducts = res;
      },
        err => console.log(err));
    })
  }

  codeValidator(): AsyncValidatorFn{
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      let code = control.value;
      console.log("cliente - code:" + code);
      return this.productService.searchProduct(control.value).pipe(map(res =>{
        if (res && res.length){
          console.log('codigo encontrado');
          return {'existe': true}; //el codigo ya esta registrado
        }
        console.log('codigo no existe');
        return null;
      }))
    }
  }
  
}
