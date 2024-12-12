import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarcontaComponent } from './criarconta.component';

describe('CriarcontaComponent', () => {
  let component: CriarcontaComponent;
  let fixture: ComponentFixture<CriarcontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarcontaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
