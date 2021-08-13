import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtentionsService {

  constructor(private http: HttpClient) { }
  getSongs() {
    return this.http.get("https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1")
  }

  convertSecondToMinute(seconds: number): string {
    let minutes = Math.floor(seconds / 60);
    let second = seconds - minutes * 60;
    return (minutes + ":" + this.str_pad_left(second, '0', 2));
  }

  str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
