import { Injectable } from '@nestjs/common';
import { SessionRepository } from './repository';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async findAll() {
    return await this.sessionRepository.findMany({ params: { include: { list: true } } });
  }

  async findById(id: string) {
    return await this.sessionRepository.findById(id);
  }

  async findUnique(id: string) {
    return await this.sessionRepository.findUnique({ where: { accountId: id }, include: { list: true } });
  }

  async create(id: string) {
    return await this.sessionRepository.create({ account: { connect: { id } } });
  }

  async update(sessionId: string, tokenId: string) {
    return await this.sessionRepository.update({ id: sessionId, list: { connect: { id: tokenId } } });
  }

  async delete(sessionId: string) {
    return await this.sessionRepository.delete([sessionId]);
  }
}
