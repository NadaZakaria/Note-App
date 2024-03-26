import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notedata } from 'src/app/core/interfaces/notedata';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(private _NotesService:NotesService,  public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notedata){}

  noteForm:FormGroup = new FormGroup({
    content: new FormControl(this.data.title ? this.data.title:'') ,
    title:new FormControl(this.data.content? this.data.content: '')
  })

  handleUserAction(form:FormGroup){
    if(!this.data.title && !this.data.content){
      this.addNewNote(form.value)
    }else{
      this.updateNote(form.value)
    }
  }

  addNewNote(newNote:Notedata){
    this._NotesService.addNoteAPI(newNote).subscribe({
      next:(res)=>{
        if(res.msg === 'done'){
          console.log(res);
        this.dialogRef.close()
      
        }
      }
     })

  }

  updateNote(newNote:Notedata){
    this._NotesService.updateNote(newNote,this.data._id).subscribe({
      next:(res)=>{
        if(res.msg === 'done'){
          console.log(res);
        this.dialogRef.close()
      
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
     })

  }

}
