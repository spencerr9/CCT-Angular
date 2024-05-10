import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList: Task[] = [
    {id: 1, title: 'test title', description: 'test description', completed: false, dueDate: new Date, projectId: 1111},
    {id: 2, title: 'test title2', description: 'test description2', completed: true, dueDate: new Date, projectId: 2222}
  ];

  private taskSubject = new BehaviorSubject<Task[]>(this.taskList)

  taskObservable = this.taskSubject.asObservable();

  constructor() { }

  addTask(task: Task) {
    this.taskList.push(task);
    this.taskSubject.next(this.taskList);
  }

  updateTask(updatedTask: Task) {
    const index = this.taskList.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      this.taskList[index] = updatedTask;
      this.taskSubject.next(this.taskList);
    }
  }

  deleteTask(taskId: number) {
    this.taskList = this.taskList.filter(t => t.id != taskId);
    this.taskSubject.next(this.taskList);
  }
}
