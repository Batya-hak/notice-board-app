import { Component } from '@angular/core';
//import { NoticesComponent } from './components/notices/notices';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BoardComponent } from './components/board/board.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, MatToolbarModule, MatCardModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'notice-board-app';
}
