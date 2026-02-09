import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import { FieldTree, applyEach, createMetadataKey, form, metadata } from '@angular/forms/signals';

import { createDynamicSectionItem, createDynamicSectionValue } from '../../helpers';

import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-form',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<DynamicSection>();
  protected readonly totalKey = createMetadataKey<number>();
  protected readonly form = form(this.data, (path) => {
    applyEach(path, (item) => {
      metadata(item, this.totalKey, ({ valueOf }) =>
        valueOf(item).reduce((sum, val) => sum + (Number(val) || 0), 0),
      );
    });
  });

  protected onAddNewSection = () =>
    this.form().value.update((v) => [...v, createDynamicSectionItem()]);

  protected onRemoveSection = (i: number) =>
    this.form().value.update((v) => v.filter((_, idx) => idx !== i));

  protected onAddNumber = (node: FieldTree<DynamicSection[number]>) =>
    node().value.update((v) => [...v, createDynamicSectionValue()]);

  protected onRemoveNumber = (node: FieldTree<DynamicSection[number]>, i: number) =>
    node().value.update((v) => v.filter((_, idx) => idx !== i));

  protected updateValue = (field: any, ev: Event) => {
    const val = (ev.target as HTMLInputElement).value;
    field().value.set(Number(val) || 0);
  };
}
