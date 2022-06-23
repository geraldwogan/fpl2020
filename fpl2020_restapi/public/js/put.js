$("document").ready(function(){
    
    $("#PUTbtn").click( function(){
        var id=$("#id").val();
        var name=$("#name").val();
        console.log(`http://localhost:3000/team/${id}`);
        $.ajax({
            url: `http://localhost:3000/team/${id}`,
            type: 'PUT',            
            data: {"id": id, "name": name },
            success: function(data) {
               // $("#response").text(data);
            }
        });
        window.location.href = 'http://localhost:3000/index.html';
    });
    
});

