function openAddModal(){
    document.getElementById("addTitle").value="";
    document.getElementById("addContent").value="";
    document.getElementById("addError").innerHTML="";

var modal= document.getElementById("addNoteModal");
modal.style.display='block';

var closeSpan=document.getElementById("closeAdd");
var cancelButton=document.getElementById("cancelAddNoteBtn");
closeSpan.onclick=()=>modal.style.display='none';
cancelButton.onclick=()=>modal.style.display='none';
}

function saveNewNote(){
    var titleString=document.getElementById("addTitle").value;
    var contentString=document.getElementById("addContent").value;
   
    addNote({title:titleString,content:contentString}).then((response)=>{
        console.log(response);
        if(response.ok){
            var modal= document.getElementById("addNoteModal");
            modal.style.display='none';
           response.json().then(json=>{
            const noteId=json._id;
            updateNotesTable(noteId);
           } );
            
        }
        else{
            response.text().then(err=>document.getElementById("addError").innerHTML=err)
        }
    }).catch(err=>{console.log(err);
        document.getElementById("addError").innerHTML=err;});
}

function openEditModal(noteId,noteTitle,noteContent){
    document.getElementById("editTitle").value=noteTitle;
    document.getElementById("editContent").value=noteContent;
    document.getElementById("editError").innerHTML="";

var modal= document.getElementById("editNoteModal");
modal.style.display='block';

modal.setAttribute("noteId",noteId);

var closeSpan=document.getElementById("closeEdit");
var cancelButton=document.getElementById("cancelEditNoteBtn");
closeSpan.onclick=()=>modal.style.display='none';
cancelButton.onclick=()=>modal.style.display='none';
}



function saveEditNote(){
var modal= document.getElementById("editNoteModal");
const noteId=modal.getAttribute("noteId");
const noteTitle=document.getElementById("editTitle").value;
const noteContent=document.getElementById("editContent").value;
updateNote({_id:noteId,title:noteTitle,content:noteContent}).then((response)=>{
    console.log(response);
    if(response.ok){
        var modal= document.getElementById("editNoteModal");
        modal.style.display='none';
        updateNotesTable(noteId);
    }
    else{
        response.text().then(err=>document.getElementById("editError").innerHTML=err)
    }
}).catch(err=>{console.log(err);
    document.getElementById("editError").innerHTML=err;});
}

