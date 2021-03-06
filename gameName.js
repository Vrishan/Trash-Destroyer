class gameName
{
    constructor()
    {
        this.title = createElement('h1');
        this.button = createButton("START");
    }

    hideElements()
    {
        this.title.hide();
        this.button.hide();
    }
     displayName()
     {
         
         this.title.html("Trash Destroyer");
         this.title.setColor = "white";
         this.title.position(displayWidth/2-60,displayHeight/2);

         this.button.position(displayWidth/2,displayHeight/2+100);
         this.button.mousePressed(function(){
            startGame = 1;
         })
     }
}