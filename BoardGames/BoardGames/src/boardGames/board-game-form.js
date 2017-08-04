import {HttpClient, json} from "aurelia-fetch-client";
import {inject, NewInstance, bindable} from "aurelia-framework";
import {Router} from "aurelia-router";
import {ValidationRules, ValidationController} from 'aurelia-validation';

@inject(HttpClient, Router, NewInstance.of(ValidationController))
export class BoardGameForm {
    
    @bindable
    id = 0;

    name = '';

    suggestedPlayers = 0;

    constructor(httpClient, router, validationController) {
        httpClient.configure(x => {
            x.useStandardConfiguration()
                .withBaseUrl("/api/");
        });
        this.http = httpClient;
        this.router = router;
        this.validationController = validationController;

        ValidationRules
            .ensure(m => m.name)
                .displayName("Name")
                .required()
            .ensure(m => m.suggestedPlayers)
                .displayName("Suggested Players")
                .required()
                .matches(/^\d*$/).withMessage('${$displayName} must be a number')
                .satisfies(m => m > 0).withMessage('${$displayName} must be greater than 0')
            .on(this);
    }

    bind() {
        if (this.id) {
            return this.http.fetch(`boardGames/${this.id}`)
                .then(x => x.json())
                .then(x => {
                    this.id = x.id;
                    this.name = x.name;
                    this.suggestedPlayers = x.suggestedPlayers;
                });
        }
    }

    save() {
        this.validationController.validate()
            .then(result => {
                if (result.valid === true) {
                    return this.http.fetch("boardGames",
                        {
                            method: this.id === 0 ? "POST" : "PUT",
                            body: json({
                                id: this.id,
                                name: this.name,
                                suggestedPlayers: this.suggestedPlayers
                            })
                        }).then(() => this.router.navigateToRoute("list"));
                }
            });
    }
}