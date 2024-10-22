import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input() post: any;
  user: any;

  getUser(id: number) {
    const api = `https://jsonplaceholder.typicode.com/users/${id}`;
    fetch(api)
      .then(response => response.json())
      .then(data => {
        this.user = data;
      })
      .catch(error => console.error('Error:', error));
  }

  ngOnInit(){
    this.getUser(this.post.userId);
  }

}
