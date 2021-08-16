import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Observer, Subject } from 'rxjs';
import { Song } from './_model/song';
import { ExtentionsService } from './_services/extentions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  @ViewChild('main') main: ElementRef;
  @ViewChild('img') image: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('listSong') ul: ElementRef;

  isLoading = true;
  curentSeconds: number = 0;
  imgElement;
  listSongElement;
  start = 0;
  test;
  isPlaying: boolean = false;
  listSongs;
  listMusics = [];
  currentSong;
  duration: string;
  currentTime: string;
  minutesTime = Math.floor(this.curentSeconds / 60);
  secondsTime = this.curentSeconds - this.minutesTime * 60;
  baseUrl = "https://api.mp3.zing.vn/api/streaming/audio/";
  musicLink;
  imgLink;
  navBar;
  viewList: boolean = false;
  constructor(
    private http: HttpClient,
    private extentionsService: ExtentionsService,
    private store: AngularFirestore) { }

  ngOnInit() {
    let loading = setInterval(() => {
      if (!this.isLoading) clearInterval(loading);
    }, 1)

    setTimeout(() => {
      this.getLink(this.start)
    }, 2000);
    setTimeout(() => {
      this.isLoading = false;
      this.imgElement = this.image?.nativeElement;
      this.listSongElement = this.ul?.nativeElement;
      this.navBar = this.nav?.nativeElement;
      if (!this.isPlaying) {
        this.imgElement.style.animationPlayState = "paused";
      }
    }, 2001);
    this.getListSongs();
    this.currentTime = this.extentionsService.convertSecondToMinute(0);
  }
  //Get list songs from API


  //Controls
  onScroll(event) {
    console.log(event);
  }

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
      this.imgElement.style.animationPlayState = "paused"
    }
    else {
      this.audioPlayerRef.nativeElement.play();
      this.imgElement.style.animationPlayState = "running"
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
    this.currentTime = this.extentionsService.convertSecondToMinute(this.curentSeconds);
  }

  onChangeAudio() {
    this.curentSeconds = this.audioPlayerRef.nativeElement.currentTime;
  }

  changeSongFromList(position: number){
    this.start = position - 1;
    this.updateSong();
    this.resetScroll();
  }

  //Update current song
  getListSongs() {
    this.extentionsService.getSongs().subscribe(res => {
      this.listSongs = res;
      this.listMusics = this.listSongs.data.song;
      // console.log(this.listMusics)
    });
  }
  getLink(song: number) {
    if (song < 0) {
      song = 99;
      this.start = 99
    }
    if (song == 100) song = 0;
    this.currentSong = this.listSongs?.data?.song[song];
    this.imgLink = this.currentSong.album ? this.currentSong.album.thumbnail_medium : this.currentSong.thumbnail
    this.musicLink = this.baseUrl + this.listSongs.data.song[song]?.id + "/320";
    this.duration = this.extentionsService.convertSecondToMinute(this.currentSong.duration)
  }

  updateSong() {
    clearInterval(this.test)
    this.getLink(this.start);
    this.curentSeconds = 0;
    this.audioPlayerRef.nativeElement.src = this.musicLink;
    this.audioPlayerRef.nativeElement.load();
    this.imgElement.style.visibility = "hidden";
    this.imgElement.style.animationName = "none";
    setTimeout(() => {
      this.imgElement.style.visibility = "visible";

    }, 1);
    setTimeout(() => {
      this.imgElement.style.animationName = "twirl";
    }, 800);
    if (this.isPlaying) {
      this.audioPlayerRef.nativeElement.currentTime = 0;
      this.audioPlayerRef.nativeElement.play();
      this.imgElement.style.animationPlayState = "running";
      this.raiseTime()
    }
  }

  raiseTime() {
    this.test = setInterval(() => {
      this.curentSeconds++;
      this.currentTime = this.extentionsService.convertSecondToMinute(Math.floor(this.curentSeconds));
    }, 1000);
  }

  resetScroll(){
    this.listSongElement.scrollTop = 0;
  }
  toggleList() {
    this.viewList = !this.viewList
    if (this.viewList)
      this.navBar.style.bottom = "calc(100vh - 100px)";
    else
      this.navBar.style.bottom = "0"
  }
}
