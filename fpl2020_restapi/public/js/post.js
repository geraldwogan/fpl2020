$("document").ready(function(){
    
    $("#POSTbtn").click( function(){
        var id=$("#id").val();
        var name=$("#name").val();
        
        console.log(id);
        console.log(name);
        console.log(`http://localhost:3000/team/`);

        $.post(`http://localhost:3000/team/`, 
        {
            "id": id,
            "name": name
        },
        function(data){
            //$("#response").text(data);
            window.location.href = 'http://localhost:3000/index.html';
        });
    });
    
    $.get(`http://localhost:3000/teams/`, function(data)
    {
        console.log(data);
        $.each(JSON.parse(data), function(i, value)
        {
            $("#table").append(`<tr><td>${value.id}</td><td>${value.name}</td>`);
        });	
    });
});
