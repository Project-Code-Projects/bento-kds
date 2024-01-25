import { TestBed } from '@angular/core/testing';

import { ChefTaskService } from './chef-task.service';

describe('ChefTaskService', () => {
  let service: ChefTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
