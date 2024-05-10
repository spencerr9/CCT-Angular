import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

interface TaskStatusPipeArgs {
  status: 'all' | 'pending' | 'completed';
  projectIds: number[];
}

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(tasks: Task[] | null, args: TaskStatusPipeArgs): Task[] {
    if (!tasks) {
      return [];
    }

    // Filter based on task status
    let filteredTasks = tasks.filter(task => {
      if (args.status === 'all') {
        return true;
      }
      return args.status === 'completed' ? task.completed : !task.completed;
    })

    // Filter filteredTasks based on project selection
    let projectFilteredTasks: Task[] = [];
    if (args.projectIds.length > 0) { // Only execute if a project is selected
      filteredTasks.map(el => {
        if (args.projectIds.includes(el.projectId)) {
          projectFilteredTasks.push(el)
        }
      })
      return projectFilteredTasks
    }
    return filteredTasks
  }

}
