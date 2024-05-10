import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Input() initalTask?: Task;

  title: string = '';
  description: string = '';
  completed: boolean = false;
  dueDate: Date | null = null;
  projectId: number = 1;
  projects$ = this.projectService.projectObservable;

  constructor(
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { initialTask: Task },
  ) {
    this.initalTask = data?.initialTask;

    this.title = this.initalTask?.title;
    this.description = this.initalTask?.description || '';
    this.completed = this.initalTask?.completed || false;
    this.dueDate = this.initalTask?.dueDate || null;
    this.projectId = this.initalTask?.projectId;
  }

  onSubmit() {
    if (this.title.trim()) {
      const newTask: Task = {
        id: this.initalTask?.id ?? 0,
        title: this.title,
        description: this.description,
        completed: this.completed,
        dueDate: this.dueDate,
        projectId: this.projectId
      }
      this.dialogRef.close(newTask)
    }
  }

}
