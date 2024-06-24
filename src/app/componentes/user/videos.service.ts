import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl:string = 'https://www.googleapis.com/youtube/v3';
  private apiKey:string = 'AIzaSyAL0vxaGN0hQOyE_ZG7SmLqP6RkWmaScEY';
  private channelId = 'UCjahao5wNhsCP5hd-J7Eb8g';

  constructor(private http: HttpClient) {}
  private favoritos: any[] = [];

  obtenerVideos(): Observable<any> {
    const parametros = new HttpParams()
      .set('key', 'AIzaSyDGwkEmd8W-Knz5hDkkuxX0ZSIjKSKso-M') 
      .set('part', 'snippet')
      .set('channelId', this.channelId)
      .set('maxResults', '9');  

    const vinculo = `${this.apiUrl}/search`;
    return this.http.get(vinculo, { params: parametros });
  }

  agregarFavorito(video: any) {
    this.favoritos.push(video);
    this.actualizarFavoritosEnLocalStorage();
  }

  private actualizarFavoritosEnLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  obtenerFavoritos() {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      this.favoritos = JSON.parse(favoritosGuardados);
    }
    return this.favoritos;
  }

  limpiarFavoritos() {
    localStorage.removeItem('favoritos');
  }

  eliminarFavorito(videoId: string) {
    this.favoritos = this.favoritos.filter(video => video.id !== videoId);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
  

  
} 
