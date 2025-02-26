import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {HttpClientTestingModule, provideHttpClientTesting} from "@angular/common/http/testing";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUser = {
    id: 2,
    firstName: "Marcin",
    lastName: "Opałka",
    email: "marcin@gmail.com",
    role: "admin"
  }

  beforeEach(async () => {

    mockUserService = jasmine.createSpyObj('UserService', ['getUser']);
    mockUserService.getUser.and.returnValue(of(mockUser));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        {provide: UserService, useValue: mockUserService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data', () => {
    expect(component.userDetails()).toEqual(mockUser);
  });

});
