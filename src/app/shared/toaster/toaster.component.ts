import { Component } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})

export class ToasterComponent {
  toasts: ToasterComponent[] = [];
  message: string = '';
  type: 'success' | 'error' = 'success';
}
