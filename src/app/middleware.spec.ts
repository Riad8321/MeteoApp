import { TestBed } from '@angular/core/testing';

import { Middleware } from './middleware';

describe('Middleware', () => {
  let service: Middleware;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Middleware);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
