import {Injectable} from '@angular/core';
import {LoginCredentials} from "../dto/model/LoginCredentials";
import {delay, Observable, of} from "rxjs";
import { v4 as UUID } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class AuthRestService {

    login(loginCredentials: LoginCredentials): Observable<string> {
        const mockToken = UUID();
        return of(mockToken).pipe(
            delay(1000),
        )
    }

}
