function addSticker(){
    
    let title=$(".title");
    let content=$('.content');
    let sticker=$('#sticker-list');
    
    if(title.val() && content.val()){
        createNote();
        reset();
    }
    
    function createNote(){
        
        let li=$('<li>');
        li.addClass('note-content');
        
        let a=$('<a>');
        a.addClass('button');
        a.text('x');
        a.on('click', ()=>li.remove());
        
        let h=$('<h2>');
        h.text(title.val())
        
        let p = $('<p>');
        p.text(content.val());
        
        li.append(a);
        li.append(h);
        li.append($('<hr>'));
        li.append(p);
        
        sticker.prepend(li);
         
    }
    
    function reset(){
        title.val('');
        content.val('');
    }
}