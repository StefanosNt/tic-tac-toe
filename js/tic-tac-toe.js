$(document).ready(function(){  
  $("#startup").modal("show");
  $("#myScore").text(0);
  $("#machineScore").text(0);  
  var role,opRole,winner;
  var myScore=0,machineScore=0,counter=0; 
  var winMoves = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ]; 
  function colorFill(id){
      if(id.text()==="X"){
        id.addClass("red");
      }else{
        id.addClass("yellow"); 
      } 
  }

  function checkWinner(role,opRole){  
    for(var i=0;i<winMoves.length;i++){
      var arr0 = $("#c"+winMoves[i][0]).text();
      var arr1 = $("#c"+winMoves[i][1]).text();
      var arr2 = $("#c"+winMoves[i][2]).text();
      if(arr0===role && arr1==role && arr2===role){   
        return 1;
      }
      else if(arr0===opRole && arr1==opRole && arr2===opRole){
        return 0; 
      }
    }
  } 
  
  function randomPoint(oppositeRole){ 
    var point = Math.floor(Math.random() * 9) + 1 ;  
    if(counter<9){
      if($("#c"+point).text()==""){
        counter++;
        $("#c"+point).text(oppositeRole);
        colorFill($("#c"+point)); 
        // console.log("correct " +point);   
        // console.log("opposite: "+counter);
      }
      else if(counter===9){
        return;
      }
      else{
        // console.log("wrong " + point);
        randomPoint(oppositeRole);
      }
    }
  }
  
  function reset(){
    counter=0;     
    $("#row1 div").empty(); 
    $("#row2 div").empty(); 
    $("#row3 div").empty(); 
 
    $(".cell").each(function(element){
      element=element+1;
      $("#c"+element).removeClass("yellow");
      $("#c"+element).removeClass("red");
      console.log(element);
    });
  }
  
  $("#reset").click(function(){
    reset();
    myScore=0;
    machineScore=0;
    $("#myScore").text(myScore);
    $("#machineScore").text(machineScore);
  });
 
  $("#startup").click(function(e) {
    role = e.target.id;    
    $("#myRole").text(role);
    if(role=="X") opRole="O";
    else opRole="X"; 
  }); 
  
  $("#block").click(function(e){    
    var id = $("#"+e.target.id);
    if(id.text()==""){
      id.text(role);  
      colorFill(id); 
      winner = checkWinner(role,opRole);  
      if(winner==1){  
        // console.log("winner:role");  
        $("#winnerLabel").text("You won!!");
        $("#winner").modal("show");
        setTimeout(function(){ $("#winner").modal("hide"); },2000); 
        counter=0; 
        myScore++;
        $("#myScore").text(myScore);
        reset(); 
      }   
      else if(winner===undefined){
        // console.log(winner ) 
        if(counter===8){
          // console.log("tie"); 
          $("#winnerLabel").text("Seems like a tie to me")
          $("#winner").modal("show");
          setTimeout(function(){ $("#winner").modal("hide"); },2000); 
          counter=0;  
          reset();  
        }else{
          randomPoint(opRole); 
          counter++;  
          winner = checkWinner(role,opRole); 
          if(winner==0){  
            // console.log("The winner is " + opRole);
            $("#winnerLabel").text("You lost...");
            $("#winner").modal("show");
            setTimeout(function(){ $("#winner").modal("hide"); },2000); 
            counter=0; 
            machineScore++;
            $("#machineScore").text(machineScore);
            reset(); 
          }           
        } 
      } 
    } 
  }); 
   // console.log("click:"+counter); 
});

