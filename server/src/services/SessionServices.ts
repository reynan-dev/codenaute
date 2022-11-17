import Member from '../entities/Member';
import Session from '../entities/Session';
import BaseServices from './base/BaseServices';

class SessionServices extends BaseServices {
  constructor() {
    super(Session);
  }

  async create(member: Member) {
    const session = new Session(member);
    return this.repository.save(session);
  }

  async findByToken(token: string): Promise<Session | null> {
    if (!token) {
      throw Error('Empty token');
    }

    return await this.repository.findOneBy({ token: token });
  }
}

export default new SessionServices();
