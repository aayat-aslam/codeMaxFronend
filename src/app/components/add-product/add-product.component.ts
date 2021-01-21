import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  imageSrc;
  maxFileSize = 20480;
  fileValidation = true;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      productName: ['', Validators.required ],
      quantity: ['', Validators.required ],
      amount: ['', Validators.required ],
      // formFile: ['', Validators.required ],
      // productDescription: ['', Validators.required ],
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if(this.maxFileSize < file.size){
        this.fileValidation = false;
      }
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result;
     
        this.angForm.patchValue({
          fileSource: reader.result
        });
        console.log(file.size);
   
      };
   
    }
  }

  addProduct(productName, quantity, amount, formFile, productDescription) {
    const obj = {
      productName,
      quantity : parseInt(quantity),
      amount : parseFloat(amount),
      formFile : this.imageSrc,
      productDescription
    };
    this.ps.addProduct(obj);
  }

  ngOnInit(): void {
  }

}
