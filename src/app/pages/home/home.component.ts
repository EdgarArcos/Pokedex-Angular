import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/Interfaces/pokeapi';
import { Pokemon } from 'src/app/Interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;
  constructor(private pokemonService: PokemonService) { }

  listaPokemon: Resultado[] = []
  pagina: number = 1
  pokemonSeleccionado?: Pokemon
  cargando: boolean = false

  ngOnInit(): void {
    this.cargarLista();
  }

  async cargarLista() {
    this.cargando = true
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)]
    this.pagina++;
    this.cargando = false
  };

  onScroll(e: any) {
    if (this.cargando) return
    if (
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight) {
      this.cargarLista()
    }
  }

  async clickTarjeta(e: string) {
    this.pokemonSeleccionado = await this.pokemonService.getById(e);
    console.log(this.pokemonSeleccionado.stats[0]);

  }

};


