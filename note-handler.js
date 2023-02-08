
function updateNotesTable(noteId,noteTitle){
    var table=document.getElementById("notes-table");
    var rowCount=table.rows.length;
    while(--rowCount){
        table.deleteRow(rowCount);
    }
    getNotes(noteTitle).then(data=>{
data.forEach(note => {
    var row =table.insertRow(1);
    row.setAttribute("id",note["_id"]);
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    cell1.innerHTML=note["title"];
    cell2.innerHTML=note["content"];
    cell3.innerHTML=note["createdDate"];
    console.log(note);
    cell4.innerHTML=`<a onclick="openEditModal('${note["_id"]}','${note["title"]}','${note["content"]}')" href="#"><img src="images/edit.png" style="width:22px;"></a>
                    <a onclick="confirmDeleteNote('${note["_id"]}')" href="#"><img src="images/delete.png" style="width:22px;"></a>`;
});
 }).then(()=>{
    if(noteId){
      var row= document.getElementById(noteId);
      row.setAttribute("style","animation:new-row 5s");

    }
 });
}

function searchNotes(){
    const searchTitle=document.getElementById("searchInput").value;
    console.log(searchTitle);
    updateNotesTable(undefined,searchTitle);
}
function confirmDeleteNote(noteId){
    var action=confirm("are you sure you want to delet this note?");
    if(action){
        deleteNote(noteId).then(()=>updateNotesTable());
    }
}

