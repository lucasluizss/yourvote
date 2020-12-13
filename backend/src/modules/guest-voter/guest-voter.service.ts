import { uuid } from 'uuidv4';
import { inject, injectable } from 'tsyringe';

import IGuestVoterService from '../../domain/guest-voter/IGuestVoterService';
import IGuestVoterEntity from '../../domain/guest-voter/guest-voter.entity';
import GuestVoterRepository from './guest-voter.repository';
import IGuestVoterRepository from '../../domain/guest-voter/IGuestVoterRepository';
import UserService from '../user/user.service';
import IUserService from '../../domain/user/IUserService';
import IEmailService, { EmailService } from '../../infra/shared/EmailService';
import { new_guest_template } from '../../infra/shared/templates/email.templates';

@injectable()
export default class GuestVoterService implements IGuestVoterService {
  constructor(
    @inject(GuestVoterRepository.name)
    private readonly guestVoterRepository: IGuestVoterRepository,
    @inject(UserService.name)
    private readonly userService: IUserService,
    @inject(EmailService.name)
    private readonly emailService: IEmailService,
  ) {}

  async list(createdBy: string): Promise<IGuestVoterEntity[]> {
    return await this.guestVoterRepository.list(createdBy);
  }

  async save(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity> {
    const userAlreadyInvited = await this.exists(guestVoter.email);

    if (userAlreadyInvited) {
      throw new Error(`${guestVoter.email} já foi convidado!`);
    }

    const userRegistered = await this.userService.getByEmail(guestVoter.email);
    const inviting = await this.userService.getById(guestVoter.createdBy);

    if (userRegistered) {
      guestVoter.userId = userRegistered._id;
    }

    guestVoter.accessCode = await this.getValidAccessCode();

    await this.emailService.send(
      guestVoter.email,
      'Convite para votar',
      new_guest_template(
        inviting.name,
        guestVoter.email,
        guestVoter.accessCode,
      ),
    );

    return await this.guestVoterRepository.save(guestVoter);
  }

  async exists(email: string): Promise<boolean> {
    return await this.guestVoterRepository.exists(email);
  }

  async validate(accessCode: string): Promise<boolean> {
    return await this.guestVoterRepository.validate(accessCode);
  }

  async delete(voteId: string): Promise<boolean> {
    return await this.guestVoterRepository.delete(voteId);
  }

  private async getValidAccessCode(): Promise<string> {
    let accessCode = uuid().substring(0, 5).toUpperCase();

    while (await this.validate(accessCode)) {
      accessCode = uuid().substring(0, 5).toUpperCase();
    }

    return accessCode;
  }
}