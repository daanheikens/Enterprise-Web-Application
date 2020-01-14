import {TestBed} from '@angular/core/testing';

import {InviteService} from './invite.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('InviteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: InviteService = TestBed.get(InviteService);
    expect(service).toBeTruthy();
  });
});
