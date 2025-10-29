import { Component, OnInit, inject } from '@angular/core';
import { Notice, NoticeUpdate } from '../../models/notice';
import { NoticesService } from '../../services/notices.service';
import { NoticeItemComponent } from '../notice-item/notice-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterNoticesPipe } from '../../pipes/filter-notices.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-board',
  standalone: true, 
  imports: [CommonModule, FormsModule, NoticeItemComponent, MatButtonModule, MatCardModule,
    MatInputModule, MatFormFieldModule, MatProgressBarModule, FilterNoticesPipe, MatIconModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  notices$!: Observable<Notice[]>;
  isLoading = true;
  errorMessage: string | null = null;
  searchText: string = '';
  isFormOpen: boolean = false;

  newNotice: NoticeUpdate = { title: '', content: '', publisherId:-1, publisherName:'' };

  private noticeService = inject(NoticesService);
  private userMockService = inject(UserService);

  ngOnInit(): void {
    this.notices$ = this.noticeService.notices$;
  }

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  // טיפול באירוע שמירה (עדכון) מקומפוננטת הבן
  handleUpdateNotice(event: { id: number, update: NoticeUpdate }, itemComponent: NoticeItemComponent): void {
    this.noticeService.updateNotice(event.id, event.update).subscribe({
      next: () => {
        console.log('The update was successful.');
        itemComponent.isEditing = false;
      },
      error: (err) => {
        console.error('Failed to update notice', err);
        alert('Error updating notice');
      }
    });
  }

  // טיפול באירוע מחיקה מקומפוננטת הבן
  handleDeleteNotice(id: number): void {
    if (!confirm('Are you sure you want to delete this notice?')) {
      return;
    }
    this.noticeService.deleteNotice(id).subscribe({
      next: () => {
        console.log('The delete was successful.');
      },
      error: (err) => {
        console.error('Failed to delete notice', err);
        alert('Error delete.');
      }
    });
  }

  
  createNewNotice(): void {
    const currentUser = this.userMockService.currentUser;
    if (currentUser) {
      this.newNotice.publisherId = currentUser.id;
      this.newNotice.publisherName = currentUser.name;
    }
    this.noticeService.addNotice(this.newNotice).subscribe({
      next: () => {
        this.newNotice = { title: '', content: '', publisherId: -1, publisherName: '' };
        this.isFormOpen = false;
      },
      error: (err) => {
        console.error('Failed to create notice', err);
        alert('Error creating notice.');
      }
    });
  }
}
