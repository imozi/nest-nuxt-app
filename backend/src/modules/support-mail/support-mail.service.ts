import { Injectable } from '@nestjs/common';
import { SupportMailHistoryRepository, SupportMailRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { SupportMailDeleteDto, SupportMailDto, SupportMailUpdateDto } from './dto';

@Injectable()
export class SupportMailService {
  constructor(
    private readonly supportMailRepository: SupportMailRepository,
    private readonly supportMailHistoryRepository: SupportMailHistoryRepository,
  ) {}

  async findAll(query: PaginateQuery) {
    return await this.supportMailRepository.findMany({
      ...query,
      params: { include: { history: { orderBy: { createdAt: 'desc' } } }, orderBy: { createdAt: 'desc' } },
    });
  }

  async create(data: SupportMailDto) {
    const unique = await this.supportMailRepository.findUnique({ where: { email: data.email } });

    if (unique) {
      await this.supportMailHistoryRepository.create({
        name: unique.name,
        email: unique.email,
        position: unique.position,
        organization: unique.organization,
        question: unique.position,
        status: unique.status,
        remoteId: unique.remoteId,
        createdAt: unique.createdAt as string,
        updatedAt: unique.createdAt as string,
      });
      await this.supportMailRepository.delete([unique.id]);
      const newMail = await this.supportMailRepository.create(data);

      await this.supportMailHistoryRepository.updateMany({
        where: {
          email: data.email,
        },
        data: {
          parentId: newMail.id,
        },
      });

      return newMail;
    }

    return await this.supportMailRepository.create(data);
  }

  async update(data: SupportMailUpdateDto) {
    return await this.supportMailRepository.update(data);
  }

  async getTotal() {
    return await this.supportMailRepository.getTotal();
  }

  async delete({ id }: SupportMailDeleteDto) {
    const mail = await this.supportMailRepository.findUnique({ where: { id: id }, include: { history: true } });

    if (!mail.history.length) {
      return await this.supportMailRepository.delete([id]);
    }

    const lastRecord = await this.supportMailHistoryRepository.findFirst({
      where: {
        email: mail.email,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await this.supportMailRepository.delete([id]);
    await this.supportMailHistoryRepository.delete([lastRecord.id]);

    const lastRecordMaild = await this.supportMailRepository.create({
      name: lastRecord.name,
      email: lastRecord.email,
      position: lastRecord.position,
      organization: lastRecord.organization,
      question: lastRecord.position,
      status: lastRecord.status,
      remoteId: lastRecord.remoteId,
      createdAt: lastRecord.createdAt as string,
      updatedAt: lastRecord.createdAt as string,
    });

    await this.supportMailHistoryRepository.updateMany({
      where: {
        email: lastRecordMaild.email,
      },
      data: {
        parentId: lastRecordMaild.id,
      },
    });

    return { status: 'OK' };
  }
}
