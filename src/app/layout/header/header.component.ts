import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    authService: AuthService = inject(AuthService);

    logout() {
        this.authService.onLogout()
    }
}
