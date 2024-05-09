import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(
    private projectService: ProjectService
  ) { }

  getProjectName(): string {
    return this.projectService.projectName(this.task.projectId)
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
