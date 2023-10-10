import { Injectable } from '@angular/core';
import { Resultado } from '../Interfaces/pokeapi';
import { Pokemon } from '../Interfaces/pokemon';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page: number, limit: number = 40): Promise<Resultado[]> {
    const offset = limit * (page - 1);
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    const resultadoJson = await resultado.json();
    if (resultadoJson.results.length > 0) return resultadoJson.results
    return [];
  }

  async getById(id: string): Promise<Pokemon> {
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const resultadoJson = await resultado.json();
    return resultadoJson
  }
}