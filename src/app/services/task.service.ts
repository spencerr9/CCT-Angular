import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList: Task[] = [
    {id: 1, title: 'test title', description: 'test description', completed: false, dueDate: new Date, projectId: 1},
    {id: 2, title: 'test title2', description: 'test description2', completed: true, dueDate: new Date, projectId: 2}
  ];

  private projectList: Project[] = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
  ]
  private taskSubject = new BehaviorSubject<Task[]>(this.taskList)
  private projectSubject = new BehaviorSubject<Project[]>(this.projectList)

  taskObservable = this.taskSubject.asObservable();
  projectObservable = this.projectSubject.asObservable();

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

  get publicProjList(): Project[] {
    return this.projectList;
  }

  projectName(id: number): string {
    let selectedProject = this.projectList.find(p => p.id === id)
    return selectedProject ? selectedProject.name : 'Unknown Project'
  }
}
