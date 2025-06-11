import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-sumas',
  templateUrl: './sumas.component.html',
  styleUrl: './sumas.component.css'
})
export class SumasComponent {
  data:number = 10;
  constructor() {
    console.log(`Nuevo dato - número es ${this.data}`);
  }
  ngOnChanges() {
    console.log(`ngOnChanges - número es ${this.data}`);
}

ngOnInit() {
    console.log(`ngOnInit - número es ${this.data}`);
}

ngDoCheck() {
    console.log('ngDoCheck');
}

ngAfterContentInit() {
    console.log('ngAfterContentInit');
}

ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
}
ngAfterViewInit() {
  console.log('ngAfterViewInit');
}

ngOnDestroy() {
  console.log('ngOnDestroy');
}

addNumber(): void {
  this.data += 10;
}

deleteNumber(): void {
  this.data -= 10;
}
}
