import {Component, inject} from '@angular/core';
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly loaderState: LoaderService = inject(LoaderService);

}
