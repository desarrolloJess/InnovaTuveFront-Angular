import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { VideosService } from '../videos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nombreUsuario: string = '';
  misVideos:any[]=[]
  misVideosOriginales: any[] = [];
  favoritos: any[] = [];
  filtroTitulo:string = '';

  constructor(private UsuariosService:UsuariosService,private videosService:VideosService,private sanitizer: DomSanitizer){
    
  }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.nombreUsuario = usuario.nombreCompleto;
    
    this.favoritos = this.videosService.obtenerFavoritos();

    this.videosService.obtenerVideos().subscribe(
      (response: any) => {
        console.log(response);
        this.misVideos = response.items; 
        this.misVideosOriginales = response.items;
      },
      error => {
        console.error('Error al cargar videos:', error);
      }
    );
  }

  buscarVideos(titulo: string) {
    if (titulo.trim() === '') {
      this.misVideos = [...this.misVideosOriginales];
    } else {
      // Filtra los videos por título
      this.misVideos = this.misVideosOriginales.filter(video =>
        video.snippet.title.toLowerCase().includes(titulo.toLowerCase())
      );
    }
  }

  agregarFavorito(video: any) {
    this.videosService.agregarFavorito(video);
    this.favoritos = this.videosService.obtenerFavoritos();
  }

  limpiarFavoritos(){
    this.videosService.limpiarFavoritos();
    this.favoritos = this.videosService.obtenerFavoritos();
    window.location.reload();
  }

  eliminarVideoFavoritos(video :any){
    this.videosService.eliminarFavorito(video);
    this.favoritos = this.videosService.obtenerFavoritos();
  }

  
  cerrarSesion(){
    this.UsuariosService.logout();
  }



}
