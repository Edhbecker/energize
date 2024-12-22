import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdeslogadoComponent } from './userdeslogado.component';

describe('UserdeslogadoComponent', () => {
  let component: UserdeslogadoComponent;
  let fixture: ComponentFixture<UserdeslogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdeslogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdeslogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
