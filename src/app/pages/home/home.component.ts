import { Component, OnInit } from '@angular/core';
import { Resultado } from 'src/app/Interfaces/pokeapi';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  listaPokemon: Resultado[] = []

  ngOnInit(): void {
    this.cargarLista();
  }

  async cargarLista() {
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage()]
  }
}
