import {HttpClient, json} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(HttpClient, Router)
export class Edit {

    id = 0;

    name = '';

    suggestedPlayers = 0;

    constructor(httpClient, router) {
        httpClient.configure(x => {
            x.useStandardConfiguration()
                .withBaseUrl("/api/");
        });
        this.http = httpClient;
        this.router = router;
    }

    activate(params) {
        return this.http.fetch(`boardGames/${params.id}`)
            .then(x => x.json())
            .then(x => {
                this.id = x.id;
                this.name = x.name;
                this.suggestedPlayers = x.suggestedPlayers;
            });
    }

    save() {
        return this.http.fetch("boardGames",
            {
                method: "PUT",
                body: json({
                    id: this.id,
                    name: this.name,
                    suggestedPlayers: this.suggestedPlayers
                })
            }).then(() => this.router.navigateToRoute("list"));
    }
}