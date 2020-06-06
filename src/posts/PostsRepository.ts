import { EntityRepository, Repository } from 'typeorm';
import { Post }                         from './Post';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {

    public getByToken(confirmToken: string): Promise<Post> {

        return this.findOneOrFail({ where: { confirmToken } });

    }

}
