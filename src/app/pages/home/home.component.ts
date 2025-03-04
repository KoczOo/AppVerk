import {Component, inject, Signal} from '@angular/core';
import {UserService} from "../../services/user.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {User} from "../../dto/model/User";


@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent {

    private readonly userService: UserService = inject(UserService);

    public userDetails: Signal<User> = toSignal(this.userService.getUser(), {
        initialValue: <User>{},
    });

}
