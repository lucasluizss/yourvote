import { container } from 'tsyringe';

import IEmailService, { EmailService } from './../shared/EmailService';
import IUserRepository from '../../domain/user/IUserRepository';
import IAccouuntRepository from '../../domain/account/IAccountRepository';
import UserRepository from '../../modules/user/user.repository';
import AccouuntRepository from '../../modules/account/account.repository';
import ISessionRepository from '../../domain/session/ISessionRepository';
import SessionRepository from '../../modules/session/session.repository';
import VoteRepository from '../../modules/vote/vote.repository';
import IVoteRepository from '../../domain/vote/IVoteRepository';
import CandidateRepository from '../../modules/candidate/candidate.repository';
import ICandidateRepository from '../../domain/candidate/ICandidateRepository';
import IGuestVoterRepository from '../../domain/guest-voter/IGuestVoterRepository';
import GuestVoterRepository from '../../modules/guest-voter/guest-voter.repository';
import IUserService from '../../domain/user/IUserService';
import UserService from '../../modules/user/user.service';

container.registerSingleton<IAccouuntRepository>(
  AccouuntRepository.name,
  AccouuntRepository,
);
container.registerSingleton<ISessionRepository>(
  SessionRepository.name,
  SessionRepository,
);
container.registerSingleton<ICandidateRepository>(
  CandidateRepository.name,
  CandidateRepository,
);
container.registerSingleton<IUserRepository>(
  UserRepository.name,
  UserRepository,
);
container.registerSingleton<IVoteRepository>(
  VoteRepository.name,
  VoteRepository,
);
container.registerSingleton<IGuestVoterRepository>(
  GuestVoterRepository.name,
  GuestVoterRepository,
);
container.registerSingleton<IUserService>(UserService.name, UserService);
container.registerSingleton<IEmailService>(EmailService.name, EmailService);
