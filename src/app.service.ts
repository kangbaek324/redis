import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(Data) private readonly dataRepository: Repository<Data>
  ) {}

  async getItemR(name: string) {
    let result;
    try {
      result = await this.cacheManager.get(name);
    } catch(err) {
      console.error(err);
      throw new InternalServerErrorException();
    }

    if (!result) {
      return {
        message: "존재하지 않는 데이터 입니다"
      }
    }
    else {
      return {
        message: "success",
        data: result
      }
    }
  }

  async createItemR(data) {
    try {
      await this.cacheManager.set(data.name, data.value);
      console.log(data.name, data.value);
    } catch(err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
    
    return {
      message: "success"
    }
  }

  async getItemM(name: string) {
    let result;
    try {
      result = await this.dataRepository.findOne({
        where: {
          name: name
        }
      });
    } catch(err) {
      console.error(err);
      throw new InternalServerErrorException();
    }

    if (!result) {
      return {
        message: "존재하지 않는 데이터 입니다"
      }
    }
    else {
      return {
        message: "success",
        data: result
      }
    }
  }

  async createItemM(data) {
    try {
      const newData = this.dataRepository.create({ name: data.name, value: data.value });
      await this.dataRepository.save(newData);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
