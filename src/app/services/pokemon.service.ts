import { Injectable } from '@angular/core';
import { Resultado } from '../Interfaces/pokeapi';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(): Promise<Resultado[]> {
    const resultado = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
    const resultadoJson = await resultado.json();

    if (resultadoJson.results.length > 0) return resultadoJson.results
    return [];
  }

  async getById(id: string) {
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const resultadoJson = await resultado.json();
    console.log(resultadoJson);

  }

  getDescripcion() {

  }

}
