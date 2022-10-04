//variables
 let Game={
    X_CLASS: 'a', //female oo
    Y_CLASS: 'c',//male xx
    turn: undefined,
    selectedProfile: document.querySelectorAll(".img.id"),
    blockElements: document.querySelectorAll('[data-cell]'),
    boardElement: document.getElementById("board"),
    startBtn: document.getElementById("startbtn"),
    winner: null,
    winEl: document.querySelector(".winner-msg"),
    drawEl: document.querySelector(".draw-msg"),
    winnerImg: document.querySelector(".winner-msg .winner"),
    restartBtn: document.getElementById("restartBtn"),
    drawBtn: document.getElementById("drawBtn"),
    startWindow: document.querySelector(".start-game") //hide the window
 }

 //used to set selected user on start screen helper functions
 function Profile(){
    let selectedProfile = document.querySelectorAll(".img .id");
    selectedProfile.forEach(img =>{
     img.addEventListener("click",e => {
         let t = e.target.dataset.id;
         removeimg(selectedProfile);
         document.querySelector(`[data-id='${t}']`).classList.add("selected");
         
       //swap values if user selects second profile
       if(t=='b'|| t=='d'){
        Game.X_CLASS='b',
        Game.Y_CLASS='d';

       }
       //set turns
       Game.turn= t=='c'|| t=='d'?true:false;//choose male true female false



      });
    });

}

 Profile()
 function removeimg(img){
    [].forEach.call(img,function(el){  //doubt
        el.classList.remove("selected");
        
    })
 }
 //game buttons
 Game.startBtn.addEventListener("click",startGame);
 Game.restartBtn.addEventListener("click",startGame);
 Game.drawBtn.addEventListener("click",startGame);
 //start
 function startGame(){
    

   //iterate over cells and make click event
   setHoverEffect();
   Game.blockElements.forEach(cell=>{
      cell.classList.remove(Game.X_CLASS);
      cell.classList.remove(Game.Y_CLASS);
      cell.classList.remove("win");
      cell.removeEventListener("click",handleClick);
      cell.addEventListener('click',handleClick,{once:true})
   })

   Game.startWindow.classList.add("hide");
   Game.winEl.classList.remove("show");
   Game.drawEl.classList.remove("show");
   Game.winnerImg.children.length ? Game.winnerImg.removeChild(Game.winner) : null;
  

 }

 //handler onclick function of blockelements
 function handleClick(e){
   const cell=e.target;
   const currentClass=Game.turn ? Game.Y_CLASS : Game.X_CLASS;//current user
   markCell(cell,currentClass);
   //check winner
   let flag=checkWin(currentClass,Game.blockElements).filter((win,index)=>{
         if(win){
            //add green background
            WIN_COMBINATIONS[index].map(i => {
               Game.blockElements[i].classList.add('win');
            })
         //set the winner
            Game.winner = Game.blockElements[WIN_COMBINATIONS[index][0]].cloneNode(true); //div that won
            return win !==false;

         } 
   });
   //check for win or draw
   if(flag.length){
      endGame(false,Game.winEl,Game.drawEl);
      Game.winnerImg.append(Game.winner);
   }else if(isDraw(flag)){
      endGame(true,Game.winEl,Game.drawEl);
   
  
 }
 Game.turn = swap(Game.turn);
 setHoverEffect();
}
//used to set hover to the cell

function setHoverEffect(){
   Game.boardElement.classList.remove(Game.X_CLASS);
   Game.boardElement.classList.remove(Game.Y_CLASS);
   if (Game.turn){
       Game.boardElement.classList.add(Game.Y_CLASS);
   }else{
       Game.boardElement.classList.add(Game.X_CLASS);
   }
}
//adding current users in the cell (board cell)
function markCell(cell,currentClass){
   cell.classList.add(currentClass);
}
//swap user turns
function swap(turn){
  return turn = !turn; 
}
//winning conditions
const WIN_COMBINATIONS=[
   [0,1,2], //hotizontal
   [3,4,5],
   [6,7,8],
   [0,3,6],//vertical
   [1,4,7],
   [2,4,8],//daigonal check
   [0,4,8]
   
];

//check for winner
function checkWin(currentClass,blockElements){
   let winMatch = [];
   WIN_COMBINATIONS.some(combination=>{
      winMatch.push(combination.every(index=>{
         return blockElements[index].classList.contains(currentClass); //returns boolean
      }));
      
   })
   return winMatch || null;
   

}
//end game function 
function endGame(draw,winEl,drawEl){
   if(!draw){
      winEl.classList.add("show");

   }else{
      drawEl.classList.add("show")

   }
}
//draw game
function isDraw(flag){
   if (flag.length) return;
   return [...Game.blockElements].every(cell => {
       return cell.classList.contains(Game.X_CLASS) ||
       cell.classList.contains(Game.Y_CLASS)
   })
}