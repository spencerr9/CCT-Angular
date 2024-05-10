import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog'
import { Task } from '../../models/task';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  private filteredTasks: Task[] = [];
  private filteredProjects: Project[] = [];

  tasks$ = this.taskService.taskObservable;
  projects$ = this.projectService.projectObservable;
  selectedTaskFilter: 'pending' | 'completed' | 'all' = 'all';
  selectedProjectFilter: number[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private dialog: MatDialog,
  ) {
    combineLatest([this.taskService.taskObservable, this.projectService.projectObservable]).subscribe(([tasks, projects]) => {
      this.filteredProjects = this.filterProjects(projects, this.selectedProjectFilter);
      this.filteredTasks = this.filterTasks(tasks, this.selectedTaskFilter);
    })
    console.log(this.taskService.taskObservable)
  }

  getTaskFilterArgs() {
    return {
      status: this.selectedTaskFilter,
      projectIds: this.selectedProjectFilter,
    }
  }

  filterTasks(tasks: Task[], status: 'all' | 'completed' | 'pending'): Task[] {
    return tasks.filter(task => 
      status === 'all' ? true : (status === 'completed' ? task.completed : !task.completed)
    )
  }

  filterProjects(projects: Project[], projectIds: number[]): Project[] {
    if (!projectIds || projectIds.length === 0) {
      return projects;
    }
    return projects.filter(project => projectIds.includes(project.id))
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

  addProject() {
    console.log('addProject')
    const dialogRef = this.dialog.open(ProjectFormComponent)

    dialogRef.afterClosed().subscribe((newProject: Project) => {
      if (newProject) {
        newProject.id = Math.floor(Math.random() * 10000);
        this.projectService.addProject(newProject)
      }
    })
  }
}
