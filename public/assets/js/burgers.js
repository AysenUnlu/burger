$(function(){

    $(".btn-success").on("click",function(event){
       event.preventDefault();
       const id=$(this).data("id");
       const newStatus={devoured:"true"};

       //Send the put request
       $.ajax("/burger/"+id,{
            type:"PUT",
            data:newStatus
       }).then(function(){
           console.log("Ate the burger. It's devoured!!"+newStatus);
           //Reload the page to get the updated list
           location.reload();
          });

     });

     $(".create-form").on("submit",function(event){
          event.preventDefault();
          const value=$("#tarea").val().trim();
          const newBurger={burger_name:value};
   
          //Send the put request
          $.ajax("/burger",{
               type:"POST",
               data:newBurger
          }).then(function(){
              console.log("Created a new Burger");
              //Reload the page to get the updated list
              location.reload();
             });
     });       
   
  });