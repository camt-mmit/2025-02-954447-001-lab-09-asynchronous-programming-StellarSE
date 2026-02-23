import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fetchResource } from '../../helpers';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Film, Person, Planet } from '../../types';

@Component({
  selector: 'app-film-view',
  imports: [RouterLink, AsyncPipe, DatePipe, ExtractIdPipe],
  templateUrl: './film-view.html',
  styleUrl: './film-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmView {
  readonly data = input.required<Film>();
  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly asyncData = computed(() => {
    const { characters, planets } = this.data();

    return {
      characters: characters.map((url) => fetchResource<Person>(url)),
      planets: planets.map((url) => fetchResource<Planet>(url)),
    } as const;
  });
}
