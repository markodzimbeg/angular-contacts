import { FavoriteContactsPipe } from './favorite-contacts.pipe';

describe('FavoriteContactsPipe', () => {
  it('create an instance', () => {
    const pipe = new FavoriteContactsPipe();
    expect(pipe).toBeTruthy();
  });
});
