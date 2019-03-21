function solve() {


    var buttons = document.getElementsByClassName("seat");
    var open=document.getElementById("open");
    var close=document.getElementById("close")
    var output=document.getElementById("output");
    var summary=document.getElementById("summary");
    var obg = {
            'Levski': {
                'A': 10,
                'B': 7,
                'C': 5
            },
         'Liverpool': {
                'A': 10,
                'B': 7,
                'C': 5
            },
         'VIP': {
                'A': 25,
                'B': 15,
                'C': 10
            },
        'summary':{
            'fans':0,
            'total':0
        }
         
    }
    

    
    summary.children[0].addEventListener('click',Sum)
    open.addEventListener('click',Open)
    close.addEventListener('click',Close)

Array.from(buttons).forEach((btn) => {
    btn.addEventListener('click', seatClick)
});


function seatClick(e) {

    var seat = e.target;
    var zone = seat.parentNode.parentNode.parentNode.parentNode.parentNode.className;
    var sector = String.fromCharCode(65 + e.target.parentNode.cellIndex);
    if (seat.style.backgroundColor === '') {
        seat.style.backgroundColor = "rgb(255,0,0)";
        obg.summary.total += obg[zone][sector];
        obg.summary.fans +=1;
        output.value +=` Seat ${seat.textContent} in zone ${zone} sector ${sector} is was taken. \n`;
    } else {
         output.value +=` Seat ${seat.textContent} in zone ${zone} sector ${sector} is unavaliable. \n`;
    }
}

    function Sum(){
        summary.children[1].textContent =`${obg.summary.total} leva,${obg.summary.fans}fans.`
    }
    
    function Open(){
        var main=document.getElementById("main")
        
        if(main.style.display="none"){
            main.style.display="block";
        }
    }
    
    function Close(){
         var main=document.getElementById("main")
         
         if(main.style.display="block"){
             main.style.display="none";
         }
    }


}
