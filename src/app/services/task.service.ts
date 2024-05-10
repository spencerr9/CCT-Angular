import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList: Task[] = [
    {
      id: 1, 
      title: 'I\'m baby gastropub swag cupping keffiyeh.', 
      description: 'Locavore knausgaard echo park, umami synth pickled retro mumblecore fixie helvetica same art party post-ironic unicorn. Post-ironic 8-bit shoreditch godard lyft chambray af meh.', 
      completed: false, 
      dueDate: new Date, 
      projectId: 1111, 
      isDiscoParty: false
    },
    {
      id: 2, 
      title: 'Ahoy matey, yar lorem ipsum text is awash with brigands', 
      description: 'Lookout flogging bilge rat main sheet bilge water nipper fluke to go on account heave down clap of thunder. Reef sails six pounders skysail code of conduct sloop cog Yellow Jack gunwalls grog blossom starboard. Swab black jack ahoy Brethren of the Coast schooner poop deck main sheet topmast furl marooned.', 
      completed: true, 
      dueDate: new Date, 
      projectId: 2222, 
      isDiscoParty: false
    },
    {
      id: 3, 
      title: 'Pop-up heirloom umami try-hard.', 
      description: 'Forage messenger bag four loko, leggings roof party literally locavore kale chips. Master cleanse sustainable 90\'s fixie +1 yuccie iceland occupy tumeric pop-up gastropub. Wayfarers yuccie art party tofu salvia activated charcoal tumblr glossier.', 
      completed: false, 
      dueDate: new Date, 
      projectId: 2222, 
      isDiscoParty: false
    },
    {
      id: 3, 
      title: 'forage hell of tonx hot chicken.', 
      description: 'Fixie try-hard bodega boys, la croix authentic aesthetic cred truffaut venmo brunch pitchfork hell of gluten-free same marfa. Tumeric PBR&B master cleanse heirloom ugh beard umami knausgaard unicorn jianbing.', 
      completed: true, 
      dueDate: new Date, 
      projectId: 1111, 
      isDiscoParty: false
    },
    {
      id: 3, 
      title: 'Shabby chic bushwick tofu praxis', 
      description: 'wayfarers typewriter readymade mixtape. Hammock synth ugh stumptown knausgaard occupy four loko keffiyeh marxism drinking vinegar. Vegan kale chips JOMO, retro succulents semiotics tousled organic chambray before they sold out hammock. Pour-over succulents meggings big mood salvia green juice aesthetic kombucha.', 
      completed: false, 
      dueDate: new Date, 
      projectId: 2222, 
      isDiscoParty: false
    },
  ];

  private taskSubject = new BehaviorSubject<Task[]>(this.taskList)

  taskObservable = this.taskSubject.asObservable();

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
}
