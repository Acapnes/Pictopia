import { Query, Resolver } from '@nestjs/graphql';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async comments() {
    return this.commentService.findAll();
  }
}
