import {HttpClient, json} from "aurelia-fetch-client";
import {inject, NewInstance, bindable, DOM} from "aurelia-framework";
import {Router} from "aurelia-router";
import {ValidationRules, ValidationController} from 'aurelia-validation';
import {Animator} from 'aurelia-templating';

@inject(HttpClient, Router, NewInstance.of(ValidationController), DOM.Element, Animator)
export class BoardGameForm {
    
    @bindable
    id = 0;

    name = '';

    suggestedPlayers = 0;

    constructor(httpClient, router, validationController, element, animator) {
        httpClient.configure(x => {
            x.useStandardConfiguration()
                .withBaseUrl("/api/");
        });
        this.http = httpClient;
        this.router = router;
        this.validationController = validationController;
        this.element = element;
        this.animator = animator;

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
                } else {
                    let errors = this.element.querySelectorAll('.validation-message');
                    this.animator.animate(Array.from(errors), 'blink');
                }
            });
    }
}