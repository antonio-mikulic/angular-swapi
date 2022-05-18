import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorCardComponent {

  @Input() name?: string;
  @Input() message?: string;
  @Input() details?: string;

  constructor() { }

}
