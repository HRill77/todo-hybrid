import { TestBed } from '@angular/core/testing';

import { Todo2Service } from './todo2.service';

describe('Todo2Service', () => {
  let service: Todo2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Todo2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});