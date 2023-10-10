import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/Interfaces/pokemon';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {

  @Input() pokemon?: Pokemon
  @Input() abierto: boolean = false;
  @Output() clickeado = new EventEmitter();
}
