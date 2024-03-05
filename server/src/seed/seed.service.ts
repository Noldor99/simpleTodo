import { Injectable, Logger } from '@nestjs/common'
import { Promise as Bluebird } from 'bluebird'
import { SeederInterface } from './seeder.interface'
import { TodoSeed } from './generation/todoSeed'



const isProdaction = process.env.NODE_ENV === 'prodaction'

@Injectable()
export class SeedService {
  private readonly seeders = []
  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly todoSeed: TodoSeed,


  ) {
    this.seeders = isProdaction
      ? [
        this.todoSeed,


      ]
      : [
        this.todoSeed,



      ]
  }

  async seed() {
    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`)
      await seeder.seed()
    })
  }
}
