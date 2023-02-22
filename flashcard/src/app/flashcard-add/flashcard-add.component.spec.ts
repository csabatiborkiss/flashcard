import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardAddComponent } from './flashcard-add.component';

describe('FlashcardAddComponent', () => {
  let component: FlashcardAddComponent;
  let fixture: ComponentFixture<FlashcardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
