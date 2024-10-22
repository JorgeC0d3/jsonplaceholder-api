import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit {
 
  user: any;
  userId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? +id : null;  // Si el parámetro id existe, lo convertimos a número
      if (this.userId !== null) {
        this.getUserDetails(this.userId);  // Llamamos al método solo si userId es un número
      }
    })
  }

  getUserDetails(userId: number) { 
    const api = `https://jsonplaceholder.typicode.com/users/${userId}`;
    fetch(api)
      .then(response => response.json())
      .then(data => {
        this.user = data;
      })
      .catch(error => console.error('Error:', error));
  }

}
