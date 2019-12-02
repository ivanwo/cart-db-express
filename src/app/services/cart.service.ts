import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    // console.log("cart me away");
    return this.http.get("http://localhost:3001/cart-items");
  }
  delete(i: number): Observable<any> {
    console.log("delete " + i + " please");
    return this.http.delete(`http://localhost:3001/cart-items/${i}`); 
  }
  add(product, price, amount) {
    console.log("adding product");
    return this.http.post(`http://localhost:3001/cart-items/`, {
      product: product,
      price: price,
      quantity: amount
    });
  }
}
