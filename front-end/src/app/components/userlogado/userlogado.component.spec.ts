import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogadoComponent } from './userlogado.component';

describe('UserlogadoComponent', () => {
  let component: UserlogadoComponent;
  let fixture: ComponentFixture<UserlogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserlogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
