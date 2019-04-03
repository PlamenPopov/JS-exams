function solve() {

    let buttons = document.getElementsByTagName("button");
    let more=document.getElementById("more");
    let less=document.getElementById("less");
    let output1 = document.querySelector("#output1 p");
    let output2 = document.querySelector("#output2 p");
    let output3 = document.querySelector("#output3 p");
    let output4 = document.querySelector("#output4 p");
    let bh=document.getElementById("main");
    
    main.style.display="none";


    buttons[0].addEventListener('click', Filter);
    buttons[1].addEventListener('click', Sort);
    buttons[2].addEventListener('click', Rotate);
    buttons[3].addEventListener('click', Get);
    more.addEventListener('click',More);
    less.addEventListener('click',Less);




    function Filter() {

        let input = document.getElementById("input1").value.split('');
        let secondCmd = document.getElementById('filterSecondaryCmd').value;
        let position = (+document.getElementById("filterPosition").value) - 1;


        switch (secondCmd) {
            case 'uppercase':
                output1.textContent += input.filter((c) => c === c.toUpperCase() && isNaN(c))[position];
                break;
            case 'lowercase':
                output1.textContent += input.filter((c) => c === c.toLowerCase() && isNaN(c))[position];
                break;
            case 'nums':
                output1.textContent += input.filter((c) => !isNaN(c))[position];
                break;
        }
    }


    function Sort() {

        let input = document.getElementById("input2").value.split('').sort((a,b)=>a.localeCompare(b));
        let secondCmd = document.getElementById('sortSecondaryCmd').value;
        let position = (+document.getElementById("sortPosition").value) - 1;
        
        if(secondCmd==='Z'){
            input=input.reverse();
        }
        
        output2.textContent += input[position];
        


    }

    function Rotate() {
      
        
        let input = document.getElementById("input3").value.split('').sort((a,b)=>a.localeCompare(b));
        let secondCmd = +document.getElementById('rotateSecondaryCmd').value;
        let position = (+document.getElementById("rotatePosition").value) - 1;
        
        let rotation=secondCmd%input.length;
        
        while(rotation>0){
            let char=input.pop();
            input.unshift(char);
            rotation-=1;
        }
        
        output3.textContent += input[position]
    }

    function Get() {
      
         let input = document.getElementById("input4").value.split('');
        let position = (+document.getElementById("getPosition").value) - 1;
        
        output4.textContent+=input[position];  
        
    }

    function More(){
        let main=document.getElementById("main");
        if(main.style.display==="none"){
            main.style.display="block"
        }
    }
    
    function Less(){
        let main=document.getElementById("main");
        if(main.style.display==="block"){
            main.style.display="none"
        }
    }
    


}
