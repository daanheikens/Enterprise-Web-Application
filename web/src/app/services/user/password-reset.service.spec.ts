import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PasswordResetService} from './password-reset.service';

describe('PasswordResetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PasswordResetService = TestBed.get(PasswordResetService);
    expect(service).toBeTruthy();
  });
});
