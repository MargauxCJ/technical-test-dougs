import {inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';

@Injectable({providedIn: 'root'})
export class CustomTitleStrategy extends TitleStrategy {
  // TODO: add meta description, or categories tag here ? rename "SEOStrategy" ?
  private title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Dougs | ${title}`);
    }
  }
}
