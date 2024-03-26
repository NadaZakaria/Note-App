import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Notedata } from 'src/app/core/interfaces/notedata';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  allnotes:Notedata[]=[]
  searchValue:string=''
  constructor(public dialog: MatDialog , private _NotesService:NotesService) {}

  ngOnInit(): void {
    this._NotesService.getnotesAPI().subscribe({
      next:(res)=>{
        if(res.msg == 'done'){

          this.allnotes = res.notes
        }
      },
      error:(err)=>{
        this.allnotes = [];
      }
    })
  }
 

  openDialog(noteData?:Notedata): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title:noteData?.title, content:noteData?.content, _id:noteData?._id},
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
   
    });
  }


  deleteNote(noteId:string, noteIndex:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{
          this._NotesService.deletenotesAPI(noteId).subscribe({
            next:(res)=>{
              if(res.msg == 'done'){
                this.allnotes.splice(noteIndex,1)
                this.ngOnInit()
              }
              
            }
          })
        })
      }
    });
  }

  updateNote(noteDetail:Notedata,noteIndex:number){
    this.openDialog({title:noteDetail.title, content:noteDetail.content, _id:noteDetail._id})

  }







}
 