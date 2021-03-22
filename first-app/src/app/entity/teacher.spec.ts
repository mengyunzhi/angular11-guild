import {Teacher} from './teacher';

describe('Teacher', () => {
  it('should create an instance', () => {
    expect(new Teacher({
      id: 1,
      email: 'email',
      name: 'name',
      password: 'password',
      sex: true,
      username: 'username'
    })).toBeTruthy();
  });
});
