import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id:any;
  currentProduct:any

  // Class 4 01-02/65
  reviewsForm!: FormGroup;
  constructor(private service : ProductService,private activatedRouter: ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.id = params['id'];
    });

    this.service.getProductById(this.id).subscribe((res)=>{
      this.currentProduct = res.data;
    });

    // Class 4 01-02/65
    this.reviewsForm= new FormGroup({
      star: new FormControl(),
      comment : new FormControl()
    });

  }
  btnReviews(idReview : any){
    let review = {
      star : this.reviewsForm.value.star,
      comment : this.reviewsForm.value.comment
    }
    // alert(review.star + review.comment + idReview);
    this.service.reviewProduct(idReview, review).subscribe((res)=>{
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(()=> this.router.navigate(['/product/detail/'+ idReview]))
    })
  }

  // createRange ทำดาว สร้างArray ตามจำนวน 
  createRange(star){
    let a = new Array(star);
    return a;
  }
}
