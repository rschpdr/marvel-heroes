import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../../services/heroes/heroes.service';

export interface Character {
  id: string;
  name: string;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  loading = true;
  error = false;
  characterList: Character[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.heroesService.fetchHeroes().subscribe(
      (response: any) => {
        // Retornar nome e id dos 10 primeiros personagens do resultado do request
        const characters = response.data.results.slice(0, 10).map(character => {
          return { id: character.id, name: character.name };
        });

        // Atribui resultado à array de exibição
        this.characterList = [...characters];

        this.loading = false;

        console.log(this.characterList);
      },
      err => {
        this.error = true;
        this.loading = false;
      }
    );
  }
}
