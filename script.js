const send = document.querySelector('#send');
const comntSection = document.querySelector('#comnt');
const firstComnt = document.querySelector('#firstComnt')
const delModal = document.querySelector('.delModal');
const cnfrmDel = document.querySelector('.yes');
const cncelDel = document.querySelector('.no');
const newText = document.querySelector('.newComnt');
const reply = document.querySelectorAll('.replyBtn');
const plus = document.querySelectorAll('.plus');
const minus = document.querySelectorAll('.minus');
let text = "";
let write = false;
let change = false;
const writeComnt = (event) =>{
    text = event.target.value;
    write = true;
}
//change voter
const changeCount =(clicked, voter) =>{
    var value = parseInt(voter.innerText);
    if(change===false && clicked === 'plus'){
        voter.innerText = value + 1;
        change = true;
    }
    else if(change===true && clicked === 'minus'){
        voter.innerText = value - 1;
        change = false;
    }
}
// delete comment
const deleteComnt =(divToRemove) => {
    delModal.style.display = 'grid';
    document.body.style.overflow = "hidden";
    cnfrmDel.addEventListener('click',()=>{
        delModal.style.display = 'none';
        document.body.style.overflow = "scroll";
        if(divToRemove.parentElement.childElementCount== 1){
            divToRemove.parentElement.remove();
        }
        else{
            divToRemove.remove();
        }
    });
    cncelDel.addEventListener('click',()=>{
        delModal.style.display = 'none';
        document.body.style.overflow = "scroll";
    });
}
// edit comment 
const editComnt = (tArea , cText, updt, positn, dateDiv)=>{
    if(!(tArea.value==="")){
        if(positn=="main"){
            tArea.value = cText.innerText;    
        }else{
            tArea.value = cText.children[1].innerText;
        }
        tArea.classList.toggle("hide");
        updt.classList.toggle("hide");
        cText.classList.toggle("hide");
        countMilli((new Date()).getTime(),dateDiv);
    }
}
//write comment
const updateComnt = (event, divToAlter, positn) =>{
    const value = event.target.value;
    if(positn=="main"){
        divToAlter.innerHTML = value;    
    }
    else{
        divToAlter.children[1].innerHTML = value;
    }
}
//for counting time
const countMilli = (time,div)=>{
    var passedTime = (new Date()).getTime() - time;
    timeSince(new Date(Date.now()- passedTime),div);
}
//Creating Comment div
const createComnt = (comntTime,position, text, parentDiv=null) =>{
    // const comntDate = (new Date()).getTime();
    const comntData = `
<div class="voter">
    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF" class="plus"/></svg>
    <span class="vote">0</span>
    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF" class="minus"/></svg>
</div>
<div class="comntDetail">
    <picture class="User">
        <source srcset="./images/avatars/image-juliusomo.webp" type="image/webp">
        <source srcset="./images/avatars/image-juliusomo.png" type="image/png"> 
        <img src="./images/avatars/image-juliusomo.png" alt="current user">
    </picture>
    <h3>juliusomo</h3>
    <button>you</button>
    <span class="date"></span>
</div>
<div class="customize">
    <div class="delBtn">
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
        <span>Delete</span>
    </div>
    <div class="editBtn">
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
        <span>Edit</span>
    </div>
</div>
<textarea class="updateComnt ${text ? "hide" : "" }"></textarea>
<button class="send update ${text ? "hide" : "" }">UPDATE</button>
<p class= "comntText ${text ? "" : "hide" }"><span class="replyTo"></span> <span></span></p>
`;
    const comntDiv = document.createElement('div');
    comntDiv.classList.add('comment');
    comntDiv.innerHTML = comntData;
    const comntText  = comntDiv.querySelector('.comntText');
    const plus = comntDiv.querySelector('.plus');
    const minus = comntDiv.querySelector('.minus');
    const editBtn = comntDiv.querySelector('.editBtn');
    const delBtn = comntDiv.querySelector('.delBtn');
    const textarea  = comntDiv.querySelector('.updateComnt');
    const updtBtn  = comntDiv.querySelector('.update');
    const dateDiv = comntDiv.querySelector('.date');
    comntText.children[1].innerText = text;
    textarea.value = text;
    if(position==="main"){
        comntText.innerText = text;
        newText.value = "";
        const newComnt = document.createElement('div');
        newComnt.classList.add('comntDiv');
        newComnt.insertAdjacentElement('afterbegin',comntDiv);
        comntSection.appendChild(newComnt);
        text = "";
        write = false;
    }
    // else if(position==="R" && text==""){
    else if(position==="R"){
        const replydiv = document.createElement('div');
        replydiv.classList.add('replyComnt');
        replydiv.prepend(comntDiv);
        firstComnt.appendChild(replydiv);
        comntText.children[0].innerText = `@${firstComnt.getAttribute("data-name")}`;
    }
    else if(position==="RR"){
        const replydiv = parentDiv;
        replydiv.prepend(comntDiv);
        comntText.children[0].innerText = `@${parentDiv.parentElement.getAttribute("data-name")}`;
    }
    else{
        const replydiv = parentDiv;
        replydiv.insertAdjacentElement("afterend",comntDiv);
        comntText.children[0].innerText = `@${parentDiv.getAttribute("data-name")}`;
    }
    minus.addEventListener('click',()=>changeCount('minus', comntDiv.querySelector('.vote')));
    plus.addEventListener('click',()=>changeCount('plus', comntDiv.querySelector('.vote')));
    delBtn.addEventListener('click',()=> deleteComnt(comntDiv));
    editBtn.addEventListener('click',()=> {
        editComnt(textarea, comntText, updtBtn, position, dateDiv);
    });
    textarea.addEventListener('change',(event)=> updateComnt(event,comntText,position));
    updtBtn.addEventListener('click', ()=> {
        editComnt(textarea, comntText, updtBtn ,position, dateDiv);
    });
    countMilli(comntTime,dateDiv);
    setInterval(()=>{
        countMilli(comntTime,dateDiv);
    },20000)
    if(window.innerWidth <=400){
        updtBtn.style.display="none";
    }
}
//-------TO UPLOAD A NEW COMMENT----------------------------//
newText.addEventListener('change',(event)=>writeComnt(event));
send.addEventListener('click', () => {
    if(write){
        const comntDate = (new Date()).getTime();
        createComnt(comntDate,"main",text);
    }
});
//----------TO UPLOAD A REPLY COMMENT-----------------------//
reply.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        const enq = btn.parentElement.nextElementSibling;
        const comntDate = (new Date()).getTime();
        if(enq===null){
            createComnt(comntDate,"R","");
        }
        else if(enq.attributes.class.value == "replyComnt"){
            createComnt(comntDate,"RR","",enq);
        }
        else{
            createComnt(comntDate,"RRR","",enq.previousElementSibling);
        } 
    });
});

//time ago function
function timeSince(date,div) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return div.innerText = Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return div.innerText = Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return div.innerText = Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return div.innerText = Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return div.innerText = Math.floor(interval) + " minutes ago";
    }
    return div.innerText = Math.floor(seconds) + " seconds ago";
}
//to upvote comment
plus.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        const voter = btn.parentElement.nextElementSibling;
        changeCount("plus", voter);
    });
});
//to remove vote
minus.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        const voter = btn.parentElement.previousElementSibling;
        changeCount("minus", voter);
    });
});
