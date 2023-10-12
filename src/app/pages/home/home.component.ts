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
  cargando: boolean = false;
  estadistica: boolean = false
  scroll: boolean = true
  nombre: string = "";
  anteriorNombre: string = ""
  previonombre: string = ""

  ngOnInit(): void {
    this.cargarLista();
  }
  async cargarListaInicial() {
    this.pagina = 1
    this.cargando = true
    this.listaPokemon = [...await this.pokemonService.getByPage(this.pagina)]
    this.pagina++
    this.cargando = false
    this.scroll = true
  };
  async cargarLista() {
    this.cargando = true
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)]
    this.pagina++;
    this.cargando = false
  };

  async cargarMismaLista() {
    let listaPokemonFiltrada = this.listaPokemon.filter((i) => i.name.toLowerCase().indexOf(this.nombre.toLowerCase()) === 0)
    this.listaPokemon = listaPokemonFiltrada;
  };

  async buscar() {
    this.scroll = false
    if (this.nombre === "") {
      this.cargarListaInicial()
      return
    } else if (this.nombre === this.anteriorNombre) {
      this.cargarMismaLista()
      return
    }
    this.listaPokemon = []
    for (let index = 1; index < 100; index++) {
      let listaPokemonFiltrada = this.listaPokemon.filter((i) => i.name.toLowerCase().indexOf(this.nombre.toLowerCase()) === 0)
      this.listaPokemon = listaPokemonFiltrada;
      this.listaPokemon = [...listaPokemonFiltrada, ...await this.pokemonService.getByPage(index)]
    }
    this.anteriorNombre = this.nombre
  }


  onScroll(e: any) {
    if (this.scroll === true) {
      if (
        Math.round(
          this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
        )
        === e.srcElement.scrollHeight) {
        this.cargarLista()
      }
    }

  }

  async clickTarjeta(e: string) {
    this.pokemonSeleccionado = await this.pokemonService.getById(e);
  }

  cambiarEstadoEstadisticas() {
    if (this.pokemonSeleccionado) this.estadistica = !this.estadistica;
  }

};


