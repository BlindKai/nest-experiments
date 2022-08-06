import { MigrationInterface, QueryRunner } from 'typeorm';
import { Post } from '../modules/posts/entities/post.entity';

export class FillPostsTable1659680488153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Post).insert([
      {
        postId: 1,
        title: 'I need to wake up',
        body: 'Donec posuere tortor non ultrices tristique. Etiam varius sapien ipsum, vitae suscipit massa varius fermentum. Suspendisse in enim ligula. Mauris ut tristique nibh. Maecenas tincidunt ex ipsum, nec lobortis nibh luctus eu. Praesent vestibulum molestie justo, mattis scelerisque leo tincidunt a. Vivamus convallis rhoncus orci at pharetra. Sed consectetur ante finibus, eleifend urna et, tincidunt nunc. Duis vitae ligula id enim vehicula ornare. Phasellus sed ante eget ligula dapibus fringilla. Aliquam erat volutpat. Duis sodales efficitur ipsum, a egestas nulla feugiat sed. Aenean lacus ligula, fermentum sit amet arcu sit amet, bibendum aliquet risus. Curabitur tellus odio, suscipit sed blandit vitae, elementum nec quam. Nam quis lectus urna. Nam augue orci, luctus eget lectus in, blandit faucibus ex.',
        author: { userId: '153a64d3-dea0-4e33-8d62-508211b92e22' },
      },
      {
        postId: 2,
        title: 'A short story',
        body: 'Duis eget ex imperdiet odio elementum facilisis et nec felis. Sed sit amet enim at quam mattis ultricies convallis rhoncus justo. Ut feugiat ut magna at feugiat. Sed ut turpis bibendum, auctor erat at, gravida enim. Donec quis sem ex. Nunc eu mollis est. Etiam pharetra tristique ante, in lobortis diam tristique venenatis. Nunc congue volutpat massa, vitae suscipit dui pharetra ac.',
        author: { userId: '0268a50a-17b6-4870-92b6-26b627a0d222' },
      },
      {
        postId: 3,
        title: 'Once upon a time',
        body: 'Sed non tempor nibh. Cras eleifend quis dolor at fermentum. Proin mattis lectus libero, in commodo elit hendrerit sed. Praesent in eros non felis interdum fringilla vel nec purus. Etiam feugiat porttitor orci. Aenean in neque quis ligula vulputate tincidunt vestibulum nec arcu. Etiam quis magna nisi.',
        author: { userId: 'a9ebfa92-42cc-4094-a1ce-2b86b985a510' },
      },
      {
        postId: 4,
        title: 'Yet another story',
        body: 'Maecenas consequat odio molestie, vulputate nulla id, ullamcorper arcu. Praesent et turpis ultricies, pretium orci a, egestas ante. Nam porta scelerisque eros, vitae tempus diam mollis et. Sed sit amet sagittis dui. Vivamus semper, felis sit amet posuere vulputate, diam felis consequat ante, vitae mattis turpis risus ac nulla. Suspendisse ultricies nibh orci, nec ornare massa maximus eu. Vestibulum eu massa sed purus cursus egestas et in nulla. Donec iaculis nulla ipsum, eu viverra metus tincidunt sit amet. Sed in risus in elit scelerisque posuere in ac nunc. Proin auctor nisl nec ante tempor dapibus. Mauris consequat justo eget lacus rhoncus finibus.',
        author: { userId: '0268a50a-17b6-4870-92b6-26b627a0d222' },
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Post).clear();
  }
}
