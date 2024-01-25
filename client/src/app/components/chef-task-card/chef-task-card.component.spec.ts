import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefTaskCardComponent } from './chef-task-card.component';

describe('ChefTaskCardComponent', () => {
  let component: ChefTaskCardComponent;
  let fixture: ComponentFixture<ChefTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChefTaskCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChefTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
