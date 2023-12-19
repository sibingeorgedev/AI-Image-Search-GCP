import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VITE_GCLOUD_AUTH_TOKEN, VITE_GOOGLE_PROJECT_ID } from './app.constants';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    constructor(private httpClient: HttpClient) { }

    public getSearchResults(searchText: string): Observable<void> {

        const headers = new HttpHeaders({
            Authorization: `Bearer ${VITE_GCLOUD_AUTH_TOKEN}`
        });

        const requestData = {
            instances: [
                {
                    prompt: searchText
                }
            ],
            parameters: {
                sampleCount: 1
            }
        };

        return this.httpClient.post<any>(
            `https://us-central1-aiplatform.googleapis.com/v1/projects/${VITE_GOOGLE_PROJECT_ID}/locations/us-central1/publishers/google/models/imagegeneration:predict`,
            requestData,
            { headers }
        );
    }

}
