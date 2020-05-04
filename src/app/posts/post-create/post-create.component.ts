import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Post } from '../post.module';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit{
  enteredContent= "";
  enteredTitle= "";
  mode = 'create';
  postId: string;
  post;
  form: FormGroup;

  constructor(private postService: PostService, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]})
    })
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          console.log("tuka")
          this.post = {id: postData._id, title: postData.title, content: postData.content}
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          })
        });
      }else{
        this.mode= 'create';
      }
    })
  }

  onAddPost(){
    if(this.form.invalid){
      return
    }
    if(this.mode === 'create'){
    this.postService.addPost(this.form.value.title, this.form.value.content)
    }else{
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }
}
