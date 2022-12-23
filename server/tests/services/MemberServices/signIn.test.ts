import MemberServices from '../../../src/services/MemberServices';
import SessionServices from '../../../src/services/SessionServices';

import { dataSource, closeDatabase, startDatabase } from '../../../src/db';
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from '../../../src/utils/errorMessage';

describe('signIn integration', () => {
  beforeAll(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    for (const entity of dataSource.entityMetadatas) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
        );
    }
  });

  describe("when email address doesn't belong to existing user", () => {
    it ("throws invalid credentials error", async () => {
      const email = 'unknown@email.com';

      expect(() => MemberServices.signIn(email, 'password')).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE)
    });
  });


  describe("when email address belongs to existing user", () => {
    const email = 'email@test.com'
    describe("when password is invalid", () => {
      it ("throws invalid credentials error", async () => {
        await MemberServices.signUp('username', email, 'password');

        expect(() => MemberServices.signIn(email, 'incorrect')).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE)
      });
    });

    describe("when password is valid", () => {
      it ("creates session in database", async () => {
        await MemberServices.signUp('username', email, 'password');

        const { session } = await MemberServices.signIn(email, 'password');

        const sessions = await SessionServices.findByToken(session.token);

        expect(sessions).toHaveLength(1);
        expect(sessions?.member.email).toEqual(email);
      });

      it ("returns user and session", async () => {
        await MemberServices.signUp('username', email, 'password');

        const login = await MemberServices.signIn(email, 'password');

        expect(login).toHaveProperty('email');
        expect(login).toHaveProperty('session');
        expect(login.user.email).toEqual(email);
      });
    });
  });
});

