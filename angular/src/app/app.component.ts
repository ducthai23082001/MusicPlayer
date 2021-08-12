import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  start = 10;
  listSongs;
  title: string;
  musicLink: Observable<string>;
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.getSongs();
    setTimeout(() => {
      this.getLink(this.start)
      // console.log(111)
    }, 2500);
  }

  getSongs() {
    this.http.get("https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR2kwy2vtkNxYdtl4uWO4tyUI5-KbxApT_XNLxptaU-lu5Gl30V6p2Gh2n0").subscribe(res => this.listSongs = res)
  }

  getLink(song: number) {
    if(song < 10) song = 10;
    this.musicLink = this.listSongs.songs.top100_VN[0].songs[song].music; //URL
    this.title = this.listSongs.songs.top100_VN[0].songs[song].title;
  }

  nextSong() {
    this.start++;
    this.getLink(this.start);
    this.audioPlayerRef.nativeElement.src = this.musicLink;
    this.audioPlayerRef.nativeElement.load();
    this.audioPlayerRef.nativeElement.play();
  }

  previousSong(){
    this.start--;
    this.getLink(this.start);
    this.audioPlayerRef.nativeElement.src = this.musicLink;
    this.audioPlayerRef.nativeElement.load();
    this.audioPlayerRef.nativeElement.play();
  }
}
