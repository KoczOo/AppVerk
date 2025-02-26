import {Component, inject} from '@angular/core';
import {UserService} from "../../services/user.service";
import {toSignal} from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {
  private readonly userService: UserService = inject(UserService);
  public userDetails = toSignal(this.userService.getUser());
}
