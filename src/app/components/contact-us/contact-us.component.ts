import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private cs: ContactUsService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required ],
      message: ['', Validators.required ],
    });
  }

  submit(email, message) {
    const obj = {
      email,
      message
    };
    this.cs.contactUs(obj);
  }

  ngOnInit(): void {
  }

}
