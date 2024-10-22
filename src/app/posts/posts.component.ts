import { Component, OnInit } from '@angular/core';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  posts: any;
  currentPage: number = 1;  // Página actual
  pageSize: number = 8;    // Tamaño de página (8 posts por página)
  totalPages: number = 0;   // Total de páginas
  paginatedPosts: any;  // Posts paginados para la página actual

  getPosts() {

    const api = "https://jsonplaceholder.typicode.com/posts";

    fetch(api)
      .then(response => response.json())
      .then(data => {
        this.posts = data;
        this.totalPages = Math.ceil(this.posts.length / this.pageSize);  // Calcular el número total de páginas
        this.paginatePosts();  // Asegurarse de paginar después de obtener los datos
        //console.log(this.posts);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Método para paginar los posts
  paginatePosts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPosts = this.posts.slice(start, end);  // Obtener los posts para la página actual
  }

  // Cambiar a una página específica
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginatePosts();  // Actualizar los posts mostrados
    }
  }


  ngOnInit() {
    this.getPosts();
  }

}
