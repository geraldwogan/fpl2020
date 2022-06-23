$("document").ready(function(){
    
    $("#GETbtn").click( function(){
        var id=$("#id").val();
        console.log(`http://localhost:3000/team/${id}`);
        $.get(`http://localhost:3000/team/${id}`, function(data){
            console.log(data);

            //$("#response").text(data);
            $("#table").empty();
            $.each(JSON.parse(data), function(i, value)
            {
                $("#table").append(`<tr><td>${value.id}</td><td>${value.name}</td>`);
            });	
         });

    });

    // $.get(`http://localhost:3000/teams/`, function(data)
    // {
    //     console.log(data);
    //     $.each(JSON.parse(data), function(i, value)
    //     {
    //         $("#table").append(`<tr><td>${value.id}</td><td>${value.name}</td>`);
    //     });	
    // });
    
});

