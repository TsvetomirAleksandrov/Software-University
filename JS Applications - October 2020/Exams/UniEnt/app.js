const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', function(ctx){
        ctx.partial('./view/home.hbs')
    });

  
});
app.run('#/home');