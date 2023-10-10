import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/Interfaces/pokemon';

@Component({
  selector: 'app-foto-pokemon',
  templateUrl: './foto-pokemon.component.html',
  styleUrls: ['./foto-pokemon.component.scss']
})
export class FotoPokemonComponent {
  @Input() pokemon?: Pokemon;
}
