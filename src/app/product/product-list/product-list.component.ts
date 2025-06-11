import { Component,OnInit, Input } from '@angular/core';
import { IProduct } from '../../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

    //@Input('datos') public products!:IProduct[];
    imagenWidht: number = 50;
    imagenMargin: number = 10;
    showImage: boolean = false;

    constructor(public productService: ProductService) { }

    deleteProduct(id:number){
      this.productService.deleteProduct(id).subscribe(() => {
        return this.productService.getProducts().subscribe((res: any[])=>{
          this.productService.products = res;
          this.productService.filteredProducts = res;
        },
        err => console.log(err));
      })
    }
    updateProduct(id: number, producto: IProduct) {
      let datos: any = {
      productName: 'Producto' + Math.round(Math.random() * (100 - 1) + 1),
      productCode: this.productService.generarCodigo(),
      releaseDate: '2019-03-07',
      price: Math.round(Math.random() * (130 - 20) + 20),
      description: 'Producto de prueba2',
      starRating: Math.round(Math.random() * (200 - 1) + 1),
      imageUrl: ''
    };

    this.productService.updateProduct(id, datos).subscribe(() => {
        return this.productService.getProducts().subscribe((res: any[]) => {
            this.productService.products = res;
            this.productService.filteredProducts = res;
          },
          err => console.log(err)
        );
      },
    );
  }
  viewProduct(product: IProduct) { }

  ngOnInit(){}
  toggleImage():void{
    this.showImage= !this.showImage;
  }
}
