export class App {
    configureRouter(config, router) {
        this.router = router;

        config.map([
            { route: "", moduleId: "home", title: "Home", nav: false },
            { route: "boardGames/list", moduleId: "boardGames/list", title: "List", name: "list", nav: true },
            { route: "boardGames/edit/:id", moduleId: "boardGames/edit", title: "Edit", name: "edit", nav: false },
            { route: "boardGames/add", moduleId: "boardGames/add", title: "Add", name: "add", nav: false }
        ]);
    }
}
