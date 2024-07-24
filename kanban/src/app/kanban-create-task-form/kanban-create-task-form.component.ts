import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-kanban-create-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kanban-create-task-form.component.html',
  styleUrls: ['./kanban-create-task-form.component.css']
})
export class KanbanCreateTaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<Task>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [' '],
      createdDate: [new Date()],
      dueDate: ['', Validators.required],
      assignee: [''],
      status: ['To Do'] // Default value for new tasks
    });
  }

  saveTask() {
    const taskData = this.taskForm.value;
    this.taskCreated.emit(taskData);
  }

  resetForm() {
    this.taskForm.reset({
      taskName: '',
      description: ' ',
      createdDate: new Date(),
      dueDate: '',
      assignee: '',
      status: 'To Do' // Reset to the default value
    });
  }
}
