import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(tasks: Task[] | null, status: 'completed' | 'pending' | 'all'): Task[] {
    if (!tasks) {
      return [];
    }

    if (status === 'all') {
      return tasks;
    }
    return tasks?.filter(task => status === 'completed' ? task.completed : !task.completed);
  }

}
