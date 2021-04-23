class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
     this.question.hide();
     this.option1.hide();
     this.option2.hide();
     this.option3.hide();
     this.option4.hide();

    //write code to change the background color here
    background("red");

    //write code to show a heading for showing the result of Quiz
    this.resultTable = createElement('h1')
    this.resultTable.html("Game Results!")
    this.resultTable.position(350,0)
    //call getContestantInfo( ) here
    getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined) {
      fill("red");
      textSize(20);
      text("Note: Players who got answer correct will be higlighted green", 130, 350);
    }

    //write code to highlight contest who answered correctly
    for (var plr in allContestants) {
      var correctAns = '2'
      if (correctAns === allContestants[plr].answer) 
      fill("green")
      else
      fill("red");
    }
  }

}
