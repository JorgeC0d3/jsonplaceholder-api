import { Component, OnInit } from '@angular/core';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: any;

  getUsers() {
    const api = 'https://jsonplaceholder.typicode.com/users';

    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la búsqueda');
        }
        return response.json();
      })
      .then((data) => {
        this.users = data;
        console.log(this.users);

      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  ngOnInit() {
    this.getUsers();
  }

}
