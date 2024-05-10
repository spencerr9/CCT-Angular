import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectList: Project[] = [
    { id: 1111, name: 'Project A' },
    { id: 2222, name: 'Project B' },
  ]
  private projectSubject = new BehaviorSubject<Project[]>(this.projectList)

  projectObservable = this.projectSubject.asObservable();

  constructor() { }

  addProject(project: Project) {
    this.projectList.push(project);
    this.projectSubject.next(this.projectList);
  }

  deleteProject(projectId: number) {
    this.projectList = this.projectList.filter(t => t.id != projectId);
    this.projectSubject.next(this.projectList);
  }

  get publicProjList(): Project[] {
    return this.projectSubject.value;
  }

  projectName(id: number): string {
    let selectedProject = this.projectSubject.value.find(p => p.id === id)
    return selectedProject ? selectedProject.name : 'Unknown Project'
  }
}
