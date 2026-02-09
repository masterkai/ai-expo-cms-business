import {Component, inject} from '@angular/core';
import {MainStore} from '../store/main.store';
import {FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Tag} from 'primeng/tag';
import {Tooltip} from 'primeng/tooltip';
import {Divider} from 'primeng/divider';
import {Card} from '../../../shared/components/card/card';

@Component({
  selector: 'app-preview-ui',
  imports: [FormsModule, ProgressSpinner, Tag, Tooltip, Divider, Card],
  templateUrl: './preview-ui.html',
  styleUrl: './preview-ui.scss',
})
export class PreviewUi {
  mainStore = inject(MainStore);

  renderObjectValues(obj: any): string {
    return Object.values(obj).join('-');
  }

  renderValue(obj: any, key: string, defaultText: string = '無資料'): string {
    return obj && obj[key] ? obj[key] : defaultText;
  }
}
