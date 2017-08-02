import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class List {
    constructor(http) {
        this.http = http;
        this.http.configure(x => x.useStandardConfiguration().withBaseUrl('/api/'));
    }

    activate() {
        return this.http.fetch('boardGames')
            .then(x => x.json())
            .then(x => this.boardGames = x);
    }
}