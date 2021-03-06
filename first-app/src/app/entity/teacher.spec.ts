import { Teacher } from './teacher';

describe('Teacher', () => {
  it('should create an instance', () => {
    expect(new Teacher(1, 'email', 'name', 'password', true, 'username')).toBeTruthy();
  });
});
