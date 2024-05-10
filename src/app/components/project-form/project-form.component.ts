import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  projectName: string = '';
  projects$ = this.projectService.projectObservable;

  constructor(
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private projectService: ProjectService,
  ) { }

  removeProject(projectId: number) {
    this.projectService.deleteProject(projectId);
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
