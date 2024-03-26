import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Notedata } from '../interfaces/notedata';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) { }

  addNoteAPI(newNote:Notedata):Observable<any>{
    return this._HttpClient.post(environment.noteUrl ,newNote,{
      headers:{
        token:localStorage.getItem('token') ||''
      }
    })
  }

  getnotesAPI():Observable<any>{
    return this._HttpClient.get(environment.noteUrl ,{
      headers:{
        token:localStorage.getItem('token')||''
      }
    })
  }

  deletenotesAPI(noteID:string):Observable<any>{
    return this._HttpClient.delete(`${environment.noteUrl}${noteID}`,{
      headers:{
        token:localStorage.getItem('token')||''
      }
    })
  }

  updateNote(newNote:Notedata, noteID:string):Observable<any>{
    return this._HttpClient.put(`${environment.noteUrl}${noteID}`,newNote, {
      headers:{
        token:localStorage.getItem('token')||''
      }
    })
  }
}
