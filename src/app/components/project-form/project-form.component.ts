import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  projectName: string = '';
  projects$ = this.projectService.projectObservable;
  taskList$ = this.taskService.taskObservable;
  projectIdFoundInTaskList: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  removeProject(projectId: number) {
    // Detect if taskList contains tasks for project to delete
    this.taskList$.subscribe(val => {
      if (val.filter(el => el.projectId === projectId).length > 0) {
        this.projectIdFoundInTaskList = true;
      }
    })

    // Alert the user or delete the project
    if (this.projectIdFoundInTaskList) {
      alert('You still have tasks assigned to this project. Please delete them before attempting to delete this project.')
    } else {
      this.projectService.deleteProject(projectId);
    }
  }

  onSubmit() {
    if (this.projectName.trim()) {
      const newProject: Project = {
        id: 0,
        name: this.projectName,
      }
      this.dialogRef.close(newProject)
    }
  }

}
