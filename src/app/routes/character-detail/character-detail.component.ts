import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from './../../../services/heroes/heroes.service';

export class CharacterDetail {
  thumbnail: string;
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  loading = true;
  error = false;
  details: CharacterDetail;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroesService: HeroesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.heroesService.fetchHero(params.params.id).subscribe(
          (response: any) => {
            if (response.data.results.length) {
              const {
                thumbnail,
                id,
                name,
                description
              } = response.data.results[0];

              this.details = {
                id,
                name,
                description,
                thumbnail: `${thumbnail.path}.${thumbnail.extension}`
              };

              this.loading = false;
            }
          },
          err => {
            this.error = true;
            this.loading = false;
          }
        );
      }
    });
  }

  back(e) {
    e.preventDefault();
    this.location.back();
  }
}
