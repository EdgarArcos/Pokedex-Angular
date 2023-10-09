import { Component, Input, OnChanges } from '@angular/core';
import { Resultado } from 'src/app/Interfaces/pokeapi';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrls: ['./tarjeta-pokemon.component.scss']
})
export class TarjetaPokemonComponent implements OnChanges {

  constructor(private pokemonService: PokemonService) { }

  ngOnChanges(): void {
    this.extraerInformacion()
  }

  @Input() data?: Resultado;
  id: string = "";

  extraerInformacion() {
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1)
      this.pokemonService.getById(this.id)
    }
  }

}
