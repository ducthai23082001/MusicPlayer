import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ExtentionsService } from './_services/extentions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  @ViewChild('main') main: ElementRef;
  onScroll(event) {
    console.log(event);
  }
  curentSeconds: number = 0;
  start = 0;
  test;
  isPlaying: boolean = false;
  listSongs;
  currentSong;
  duration: string;
  currentTime: string;
  minutesTime = Math.floor(this.curentSeconds / 60);
  secondsTime = this.curentSeconds - this.minutesTime * 60;
  baseUrl = "https://api.mp3.zing.vn/api/streaming/audio/";
  musicLink;
  constructor(private http: HttpClient, private extentionsService: ExtentionsService) { }
  ngOnInit() {
    this.getListSongs();
    setTimeout(() => {
      this.getLink(this.start)
    }, 1800);
    this.currentTime = this.extentionsService.convertSecondToMinute(0);
  }
  //Get list songs from API


  //Controls
  nextSong() {
    this.start++;
    this.updateSong();
  }

  previousSong() {
    this.start--;
    this.updateSong();
  }

  toggle() {
    this.curentSeconds = this.audioPlayerRef.nativeElement.currentTime;
    this.isPlaying = !this.isPlaying;
    if (!this.isPlaying) {
      this.audioPlayerRef.nativeElement.pause();
      clearInterval(this.test);
      this.currentTime = this.extentionsService.convertSecondToMinute(Math.floor(this.curentSeconds));
    }
    else {
      this.audioPlayerRef.nativeElement.play();
      this.raiseTime();
    }
  }

  firstSong() {
    this.start = 0;
    this.updateSong();
  }

  lastSong() {
    this.start = 99;
    this.updateSong();
  }

  onChangeInput() {
    this.audioPlayerRef.nativeElement.currentTime = this.curentSeconds;
  }

  onChangeAudio() {
    this.curentSeconds = this.audioPlayerRef.nativeElement.currentTime;
    console.log(this.curentSeconds)
  }

  //Update current song
  getListSongs() {
    this.extentionsService.getSongs().subscribe(res => this.listSongs = res);
  }
  getLink(song: number) {
    if (song < 0) song = 99;
    if (song == 100) song = 0;
    this.currentSong = this.listSongs?.data?.song[song];
    this.musicLink = this.baseUrl + this.listSongs.data.song[song]?.id + "/320";
    this.duration = this.extentionsService.convertSecondToMinute(this.currentSong.duration)
  }

  updateSong() {
    clearInterval(this.test)
    this.getLink(this.start);
    this.curentSeconds = 0;
    this.audioPlayerRef.nativeElement.src = this.musicLink;
    this.audioPlayerRef.nativeElement.load();
    if (this.isPlaying) {
      this.audioPlayerRef.nativeElement.currentTime = 0;
      this.audioPlayerRef.nativeElement.play();
      this.raiseTime()
    }
  }

  raiseTime() {
    this.test = setInterval(() => {
      this.curentSeconds++;
      this.currentTime = this.extentionsService.convertSecondToMinute(Math.floor(this.curentSeconds));
    }, 1000);
  }


}
