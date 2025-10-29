import { Pipe, PipeTransform } from '@angular/core';
import { Notice } from '../models/notice';

@Pipe({
  name: 'filterNotices',
  standalone: true 
})
export class FilterNoticesPipe implements PipeTransform {

  transform(notices: Notice[], searchText: string): Notice[] {
    if (!notices || !searchText) {
      return notices;
    }

    const lowerSearchText = searchText.toLowerCase();

    return notices.filter(notice => {
      const titleMatch = notice.title.toLowerCase().includes(lowerSearchText);
      const contentMatch = notice.content.toLowerCase().includes(lowerSearchText);
      const publisherMatch = notice.publisherName.toLowerCase().includes(lowerSearchText);

      return titleMatch || contentMatch || publisherMatch;
    });
  }
}
