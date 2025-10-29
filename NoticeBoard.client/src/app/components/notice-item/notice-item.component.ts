import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Notice, NoticeUpdate } from '../../models/notice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/users.service';
@Component({
  selector: 'app-notice-item',
  standalone: true, 
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './notice-item.component.html',
  styleUrls: ['./notice-item.component.css']
})
export class NoticeItemComponent implements OnInit {
  @Input({ required: true }) notice!: Notice;

  @Output() noticeUpdate = new EventEmitter<{ id: number, update: NoticeUpdate }>();
  @Output() noticeDelete = new EventEmitter<number>();

  currentUserId: number | null = null;
  private userService = inject(UserService);
  isEditing = false;

  // מודל זמני לעריכה כדי לא לשנות את המקור ישירות
  editedNotice: NoticeUpdate = { title: '', content: '', publisherId: -1, publisherName:'' };

  ngOnInit(): void {
    this.currentUserId = this.userService.currentUser?.id ?? null;
    this.resetEditedNotice();
  }

  // העתקת הנתונים למודל העריכה הזמני
  resetEditedNotice(): void {
    this.editedNotice.title = this.notice.title;
    this.editedNotice.content = this.notice.content;
    this.editedNotice.publisherId = this.notice.publisherId;
    this.editedNotice.publisherName = this.notice.publisherName;
  }

  enterEditMode(): void {
    this.isEditing = true;
  }

  // שמירת השינויים ושליחה לאב
  saveChanges(): void {
    this.noticeUpdate.emit({
      id: this.notice.id,
      update: this.editedNotice
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.resetEditedNotice(); 
  }

  // שליחת אירוע מחיקה לאב
  deleteNotice(): void {
    this.noticeDelete.emit(this.notice.id);
  }
}
