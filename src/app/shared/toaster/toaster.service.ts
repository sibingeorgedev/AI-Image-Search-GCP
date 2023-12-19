// toaster.service.ts

import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { ToasterComponent } from './toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasts: ToasterComponent[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  addToast(message: string, type: 'success' | 'error' = 'success'): void {
    const factory = this.resolver.resolveComponentFactory(ToasterComponent);
    const componentRef = factory.create(this.injector);

    const toast = componentRef.instance as ToasterComponent;
    toast.message = message;
    toast.type = type;

    this.toasts.push(toast);

    // Attach the component to the appRef so it becomes part of the Angular change detection
    this.appRef.attachView(componentRef.hostView);

    // Add the component to the DOM
    document.body.appendChild(componentRef.location.nativeElement);

    // Remove toast after 3 seconds (adjust the timing as needed)
    setTimeout(() => {
      this.toasts.splice(this.toasts.indexOf(toast), 1);
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 3000);
  }

  displayError(error: any): void {
    const errorMessage = this.extractErrorMessage(error);
    this.addToast(errorMessage, 'error');
  }

  private extractErrorMessage(error: any): string {
    // Customize this function based on the structure of your error object
    if (error && error.message) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'An error occurred';
    }
  }
}
