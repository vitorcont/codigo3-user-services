import { generateId } from '../../utils/uuid';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const args = params.args ?? {};

      if (params.action === 'create') {
        params.args = {
          ...args,
          data: {
            ...args.data,
            id: generateId(),
          },
        };
      }

      return next(params);
    });

    // this.$use(async (params, next) => {
    //   const args = params.args ?? {};
    //   const where = args.where ?? {};

    //   if (params.action === 'findUnique') {
    //     params.action = 'findFirst';
    //   }

    //   if (
    //     params.action === 'findFirst' ||
    //     params.action === 'findMany' ||
    //     params.action === 'count'
    //   ) {
    //     params.args = {
    //       ...args,
    //       where: { ...where, deletedAt: true },
    //     };
    //   }

    //   return next(params);
    // });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

export default PrismaService;
