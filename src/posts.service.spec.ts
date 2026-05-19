import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // arrange + act
      const result = postsService.findMany();
      
      // assert
      expect(result).toHaveLength(4);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
      expect(result[3].text).toBe('Post 4');
    });

    it('should return correct posts for skip and limit options', () => {
      // arrange + act
      const result = postsService.findMany({ skip: 1, limit: 2 });
      
      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    // Дополнительные тест-кейсы

    it('should return posts with limit only', () => {
      const result = postsService.findMany({ limit: 2 });
      
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });

    it('should return posts with skip only', () => {
      const result = postsService.findMany({ skip: 2 });
      
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return empty array when skip exceeds posts count', () => {
      const result = postsService.findMany({ skip: 10 });
      
      expect(result).toHaveLength(0);
    });

    it('should return all posts when limit exceeds posts count', () => {
      const result = postsService.findMany({ limit: 10 });
      
      expect(result).toHaveLength(4);
    });

    it('should return empty array when limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });
      
      expect(result).toHaveLength(0);
    });

    it('should return correct posts when skip is 0', () => {
      const result = postsService.findMany({ skip: 0, limit: 3 });
      
      expect(result).toHaveLength(3);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
    });
  });
});