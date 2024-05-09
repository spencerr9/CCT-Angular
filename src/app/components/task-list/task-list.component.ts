import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog'
import { Task } from '../../models/task';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  private filteredTasks: Task[] = [];

  tasks$ = this.taskService.taskObservable;
  displayedColumns: string[] = ['title', 'dueDate', 'completed', 'edit-delete']
  dataSource = new MatTableDataSource<Task>([]);
  selectedFilter: 'pending' | 'completed' | 'all' = 'all'

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {
    combineLatest([this.taskService.taskObservable, this.taskService.projectObservable]).subscribe(([tasks, projects]) => {
      this.filteredTasks = this.filterTasks(tasks, 'all');
    })
    // this.tasks$.subscribe((tasks) => {
    //   this.dataSource.data = tasks || [];
    // })
  }

  filterTasks(tasks: Task[], status: 'all' | 'completed' | 'pending'): Task[] {
    return tasks.filter(task => 
      status === 'all' ? true : (status === 'completed' ? task.completed : !task.completed)
    )
  }

  getProjectName(projectId: number): string {
    const project = this.taskService.publicProjList.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { initialTask: task }
    });

    dialogRef.afterClosed().subscribe((updatedTask: Task) => {
      if (updatedTask) {
        this.taskService.updateTask(updatedTask);
      }
    })
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  addTask () {
    const dialogRef = this.dialog.open(TaskFormComponent)

    dialogRef.afterClosed().subscribe((newTask: Task) => {
      if (newTask) {
        newTask.id = Math.floor(Math.random() * 10000);
        this.taskService.addTask(newTask);
      }
    })
  }
}
