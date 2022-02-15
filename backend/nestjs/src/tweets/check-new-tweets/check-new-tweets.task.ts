import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TweetsService } from '../tweets.service';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CheckNewTweetsTask {
  constructor(
    private tweetService: TweetsService,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}
  
  private limit = 10;

  @Interval(10000)
  async handle() {
    console.log('Procurando tweets !!');
    let offset = await this.cache.get<number>('tweet-offset');
    offset = offset === undefined || offset === null ? 0 : offset;

    console.log(`offset: ${offset}`);

    const tweets = await this.tweetService.findAll({
      offset,
      limit: this.limit,
    });

    console.log(`tweets count: ${tweets.length}`);

    if (tweets.length === this.limit) {
      console.log(`Achou mais ${this.limit}`);

      await this.cache.set('tweet-offset', offset + this.limit, {
        ttl: 1 * 60 * 10,
      });
      console.log(`Enviar Email !`);
      this.emailsQueue.add({});
    }
  }
}
