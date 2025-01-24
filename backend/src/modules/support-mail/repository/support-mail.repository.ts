import { PrismaService } from '@/app/common';

import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportMailRepository extends BasePostgresRepository<'SupportMail'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'supportMail', ['email', 'name', 'organization']);
  }

  async getTotal() {
    return await this.prisma.supportMail.count();
  }

  async getTotalYear(year: number) {
    return await this.prisma.$queryRaw`
      WITH months AS (
        SELECT 
          DATE_TRUNC('month', MAKE_DATE(CAST(${year} AS INT), 1, 1) + INTERVAL '1 month' * n) AS month
        FROM generate_series(0, 11) AS n
      )
      SELECT 
        m.month, 
        COALESCE(COUNT(sm.created_at)::TEXT, '0') AS count 
      FROM months m
      LEFT JOIN (
        SELECT created_at FROM support_mails
        UNION ALL
        SELECT created_at FROM support_mails_history
      ) AS sm 
      ON DATE_TRUNC('month', sm.created_at) = m.month -- Сравнение без строкового приведения
      GROUP BY m.month
      ORDER BY m.month ASC;
    `;
  }
}
