import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findManyWithPagination() {
    return await this.accountRepository.findMany();
  }
}
