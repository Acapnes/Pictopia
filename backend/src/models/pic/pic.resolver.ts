import { Query, Resolver } from '@nestjs/graphql';
import { Pic } from 'src/schemas/pic.schema';
import { PicService } from './pic.service';

@Resolver(() => Pic)
export class PicResolver {
  constructor(private readonly picService: PicService) {}

  @Query(() => [Pic])
  async pics() {
    return this.picService.findAll();
  }
}
