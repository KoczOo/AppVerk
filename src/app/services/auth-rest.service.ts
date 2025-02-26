import {Injectable} from '@angular/core';
import {LoginCredentials} from "../dto/model/LoginCredentials";
import {delay, Observable, of} from "rxjs";
import { v4 as uuidv4 } from 'uuid';

class UUID {
}

@Injectable({
    providedIn: 'root'
})
export class AuthRestService {

    login(loginCredentials: LoginCredentials): Observable<string> {
        const mockToken = uuidv4();
        return of(mockToken).pipe(
            delay(1000),
        )
    }

}
