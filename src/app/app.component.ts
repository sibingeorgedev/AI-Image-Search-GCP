import { Component } from '@angular/core';
import { AppService } from './app.services';
import { ToasterService } from './shared/toaster/toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ai-image-search';
  isResultsVisible = false;
  isSearchBoxFocused = false;
  searchText = '';
  previewImage = '';
  isImageLoading = false;

  constructor(
    private appService: AppService,
    private toasterService: ToasterService
  ) { }

  public generateImages() {
    this.isResultsVisible = true;
    if (!this.searchText) {
      return;
    }
    this.isImageLoading = true;
    this.appService.getSearchResults(this.searchText)
      .pipe()
      .subscribe((res: any) => {
        const base64String = res.predictions[0].bytesBase64Encoded;
        this.previewImage = `data:image/png;base64,${base64String}`;
        this.isImageLoading = false;
      },
        (err) => {
          console.error(err);
          const simulatedError = { message: 'Simulated error message' };
          this.toasterService.displayError(simulatedError);
          this.isImageLoading = true;
        });
  }

  public onSearchBoxFocus() {
    this.isSearchBoxFocused = true;
  }
}
