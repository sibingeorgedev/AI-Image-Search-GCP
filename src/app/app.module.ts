import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from './app.services';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { ToasterModule } from './shared/toaster/toaster.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        SpinnerModule,
        ToasterModule,
        HttpClientModule,
    ],
    declarations: [AppComponent],
    // exports: [AppComponent],
    providers: [AppService],
    bootstrap: [AppComponent]
})

export class AppModule { }
