import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishFeedback } from '../shared/feedback';
//import {MdSliderModule} from '@angular/material/typings/slider';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishdetailComponent implements OnInit {
  errMess: string;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  feedbackForm: FormGroup;
  feedback: DishFeedback;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 4 characters long.'
    }
  };
  
    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder, @Inject('BaseURL') private BaseURL) { 
        this.createForm();
      }
  
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
      this.route.params.switchMap((params: Params) => this.dishservice.getDish(+params['id'])).subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }
  
    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  
    goBack(): void {
      this.location.back();
    }

    createForm() {
      this.feedbackForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2)] ],
        rating: [5],
        comment: ['', [Validators.required, Validators.minLength(4)] ]
      });
    
      this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  
    this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
      if (!this.feedbackForm) { return; }
      const form = this.feedbackForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

    onSubmit() {
      this.feedback = this.feedbackForm.value;
      console.log(this.feedback);
      this.dish.comments.push(this.feedback);
      this.feedbackForm.reset({
        author: '',
        rating: 5,
        comment: '',
        date: Date.now()
      });
      //make form pristine if possible
    }

    
}