import { Injectable } from '@nestjs/common';
import { SupportMailHistoryRepository, SupportMailRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { SupportMailCountDto, SupportMailDeleteDto, SupportMailDto, SupportMailUpdateDto } from './dto';

@Injectable()
export class SupportMailService {
  constructor(
    private readonly supportMailRepository: SupportMailRepository,
    private readonly supportMailHistoryRepository: SupportMailHistoryRepository,
  ) {}

  async findAll(query: PaginateQuery) {
    return await this.supportMailRepository.findMany({
      ...query,
      params: { orderBy: { createdAt: 'desc' } },
    });
  }

  async history(query: PaginateQuery) {
    return await this.supportMailHistoryRepository.findMany({
      ...query,
      params: { where: { parentId: query.id }, orderBy: { createdAt: 'desc' } },
    });
  }

  async create(data: SupportMailDto) {
    const unique = await this.supportMailRepository.findUnique({ where: { email: data.email } });

    if (unique) {
      return await this.supportMailRepository.transactionStep(async (tx) => {
        await tx.supportMailHistory.create({
          data: {
            name: unique.name,
            email: unique.email,
            position: unique.position,
            organization: unique.organization,
            question: unique.question,
            status: unique.status,
            remoteId: unique.remoteId,
            createdAt: unique.createdAt as string,
            updatedAt: unique.createdAt as string,
          },
        });

        await tx.supportMail.delete({ where: { id: unique.id } });
        const newMail = await tx.supportMail.create({ data });

        await tx.supportMailHistory.updateMany({
          where: {
            email: data.email,
          },
          data: {
            parentId: newMail.id,
          },
        });

        return newMail;
      });
    }

    return await this.supportMailRepository.create(data);
  }

  async update(data: SupportMailUpdateDto) {
    return await this.supportMailRepository.update(data);
  }

  async getTotal() {
    return await this.supportMailRepository.transactionStep(async (tx) => {
      const countMails = await tx.supportMail.count();
      const countHistory = await tx.supportMailHistory.count();

      return countMails + countHistory;
    });
  }

  async updateHistory(data: SupportMailUpdateDto) {
    return await this.supportMailHistoryRepository.update(data);
  }

  async getTotalYear() {
    return await this.supportMailRepository.getTotalYear(new Date().getFullYear());
  }

  async getTotalNew({ email }: SupportMailCountDto) {
    return this.supportMailHistoryRepository.getTotalNew(email);
  }

  async deleteHistory({ id }: SupportMailDeleteDto) {
    return await this.supportMailHistoryRepository.delete([id]);
  }

  async delete({ id }: SupportMailDeleteDto) {
    const mail = await this.supportMailRepository.findUnique({ where: { id: id }, include: { history: true } });

    if (!mail.history.length) {
      return await this.supportMailRepository.delete([id]);
    }

    return await this.supportMailRepository.transactionStep(async (tx) => {
      const lastRecord = await tx.supportMailHistory.findFirst({
        where: {
          email: mail.email,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      await tx.supportMail.delete({ where: { id } });
      await tx.supportMailHistory.delete({ where: { id: lastRecord.id } });

      const lastRecordMaild = await tx.supportMail.create({
        data: {
          name: lastRecord.name,
          email: lastRecord.email,
          position: lastRecord.position,
          organization: lastRecord.organization,
          question: lastRecord.question,
          status: lastRecord.status,
          remoteId: lastRecord.remoteId,
          createdAt: lastRecord.createdAt as unknown as string,
          updatedAt: lastRecord.createdAt as unknown as string,
        },
      });

      await tx.supportMailHistory.updateMany({
        where: {
          email: lastRecordMaild.email,
        },
        data: {
          parentId: lastRecordMaild.id,
        },
      });

      return { status: 'OK' };
    });
  }
}
