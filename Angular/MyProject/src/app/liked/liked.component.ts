import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-liked',
  standalone: false,
  
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.css'
})
export class LikedComponent {
  @Input() likedProducts: any[] = [];

}
