import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'fb-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(
    public storeService: StoreService
  ) {}
}
