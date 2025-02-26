import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../dto/model/User";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userUrl = 'assets/user.json';

    constructor(private http: HttpClient) {
    }

    getUser(): Observable<User> {
        return this.http.get<User>(this.userUrl);
    }
}
