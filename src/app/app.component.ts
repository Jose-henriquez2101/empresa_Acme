import { Component } from '@angular/core';
import { allIcons, image } from 'ngx-bootstrap-icons';
import { IProduct } from './product';
import { ProductService } from './product/product.service';
import { ModalAddService } from './services/modal-add.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  //providers: [ProductService]
})
export class AppComponent  {
  
  constructor(private productService: ProductService, private modalAddService: ModalAddService, private router:Router) {}
  title = 'EmpresaACME';
   _listFilter: string = ' ';
   //filteredProducts: IProduct[] = [];
   //products: IProduct[];


/*
  products:IProduct[]=[
    {
      "productID":1,
      "productName":"Zapatilla Lona",
      "productCode":"GCN-0011",
      "releaseDate":"2015-01-01",
      "description":"Zapatilla de lona para correr",
      "price": 19.95,
      "starRating": 100,
      "imageUrl":"https://picsum.photos/100/100"

    }, {
      "productID":2,
      "productName":"Zapato",
      "productCode":"GCN-0022",
      "releaseDate":"2015-02-02",
      "description":"Zapatilla para correr",
      "price": 20.30,
      "starRating": 200,
      "imageUrl":"https://picsum.photos/100/100"

    }, {
      "productID":3,
      "productName":"Zapato elegante",
      "productCode":"GCN-0033",
      "releaseDate":"2015-03-03",
      "description":"zapato elegante para cualquier ocasión",
      "price": 50.95,
      "starRating": 40,
      "imageUrl":"https://picsum.photos/100/100"

    }, {
      "productID":4,
      "productName":"Casaca",
      "productCode":"GCN-0044",
      "releaseDate":"2015-04-04",
      "description":"Casaca térmica antilluvia",
      "price": 60,
      "starRating": 119,
      "imageUrl":"https://picsum.photos/100/100"

    }, {
      "productID":5,
      "productName":"Calcetin",
      "productCode":"GCN-0055",
      "releaseDate":"2015-05-05",
      "description":"Calsetin naranja del pie derecho",
      "price": 19.95,
      "starRating": 123,
      "imageUrl":"https://picsum.photos/100/100"

    }, {
      "productID":6,
      "productName":"Calcetin izquierdo de lana",
      "productCode":"GCN-0066",
      "releaseDate":"2015-06-06",
      "description":"Calsetin de lana",
      "price": 10.99,
      "starRating": 162,
      "imageUrl":"https://picsum.photos/100/100"

    },


  ]*/
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string) {
     this._listFilter = value;
   this.productService.filteredProducts=
       this.listFilter ? this.performFilter(this.listFilter):
       this.productService.products;
  }
  performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLowerCase();
    return this.productService.products.filter((products: IProduct)=> products.productName.toLowerCase().indexOf(filterBy)!==-1)
  }

  
  ngOnInit(): void {
  this.productService.getProducts().subscribe(
    (res: any) => {
      this.productService.products = res;
      this.productService.filteredProducts = res;
      console.log(this.productService.products);
    },
    err => console.log(err)
  );
  } 
  crearProducto(){
    let datos: any = {
      name: 'Producto' + Math.round(Math.random() * (100-1)+1),
      code: this.productService.generarCodigo(),
      date: '2019-03-07',
      price: Math.round(Math.random() * (130-20)+20),
      description: 'Este es un producto',
      starRating: Math.round(Math.random() * (200-1)+1),
      image:''
    };
    this.guardarProducto(datos);
  }
  guardarProducto(producto: IProduct){
    this.productService.saveProduct(producto).subscribe(() =>{
      return this.productService.getProducts().subscribe((res:any[])=>{
        this.productService.products = res;
        this.productService.filteredProducts = res;
      },
        err => console.log(err));
    })
  }
  
  abrirModal(){
    this.modalAddService.mostrarModal();
  }
  navegar(){
    this.router.navigate(['product/product-list']);
  }

  
  


}