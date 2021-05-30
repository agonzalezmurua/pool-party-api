import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { UserProvider } from './entities/user-provider.entity';

import { UserProviderKind } from './interfaces/user-provider.kind.enum';
import { Roles } from './interfaces/user-roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProvider)
    private userProviderRepository: Repository<UserProvider>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async createOne(dto: CreateUserDTO): Promise<User> {
    const provider = this.userProviderRepository.create(dto.provider);
    await this.userProviderRepository.save(provider);

    const user = this.usersRepository.create({
      active: true,
      avatar_url: dto.user.username,
      country_code: dto.user.country_code,
      cover_url: dto.user.cover_url,
      providers: [provider],
      role: Roles.user,
      username: dto.user.username,
    });
    await this.usersRepository.save(user);

    return user;
  }

  async findOneByProvider(kind: UserProviderKind, id: number): Promise<User> {
    const provider = await this.userProviderRepository.findOne({
      relations: ['user'],
      where: { kind: kind, provider_id: id },
    });

    return provider.user;
  }
}
