import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { TaskComponent } from './task/task.component';

// Definir la interfaz Task
export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, TaskComponent],  // Asegurarse de importar FormsModule
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusFilter: string | boolean = '';  // Para filtrar por estado (completed o no)
  userFilter: number | null = null;  // Para filtrar por userId

  getTasks() {
    const api = "https://jsonplaceholder.typicode.com/todos";
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la búsqueda');
        }
        return response.json();
      })
      .then((data: Task[]) => {  // Aquí definimos que los datos de la API son de tipo Task[]
        this.tasks = data;
        this.filteredTasks = data;  // Inicialmente todas las tareas son mostradas
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  applyFilter() {
    this.filteredTasks = this.tasks.filter((task: Task) => {
      const matchesStatus = this.statusFilter === '' || task.completed === JSON.parse(this.statusFilter.toString());
      const matchesUser = !this.userFilter || task.userId === this.userFilter;
      return matchesStatus && matchesUser;
    });
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  ngOnInit() {
    this.getTasks();  // Llamamos a getTasks para obtener los datos al cargar la página
  }
}
