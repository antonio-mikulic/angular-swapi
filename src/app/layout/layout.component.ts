import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppComponentBase } from 'src/app/shared/app-component-base';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends AppComponentBase implements OnDestroy, AfterViewInit {
  @ViewChild(MatSidenav) public sidenav?: MatSidenav;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    super(injector);
    this.mobileQuery = this.media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this._toggleSidebarOnLoad();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeAllListeners?.();
  }

  private _toggleSidebarOnLoad(): void {
    if (this.mobileQuery.matches) {
      requestAnimationFrame(() => {
        this.sidenav?.open();
        this.changeDetectorRef.markForCheck();
      })
    }
  }
}
