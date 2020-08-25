import { container } from 'tsyringe';

import IEmailService, { EmailService } from './../shared/EmailService';
import IUserRepository from '../../domain/user/IUserRepository';
import IAccouuntRepository from '../../domain/account/IAccountRepository';
import UserRepository from '../../modules/user/user.repository';
import AccouuntRepository from '../../modules/account/account.repository';
import IElectionRepository from '../../domain/election/IElectionRepository';
import ElectionRepository from '../../modules/election/election.repository';
import VoteRepository from '../../modules/vote/vote.repository';
import IVoteRepository from '../../domain/vote/IVoteRepository';
import CandidateRepository from '../../modules/candidate/candidate.repository';
import ICandidateRepository from '../../domain/candidate/ICandidateRepository';

container.registerSingleton<IAccouuntRepository>(AccouuntRepository.name, AccouuntRepository);
container.registerSingleton<ICandidateRepository>(CandidateRepository.name, CandidateRepository);
container.registerSingleton<IElectionRepository>(ElectionRepository.name, ElectionRepository);
container.registerSingleton<IUserRepository>(UserRepository.name, UserRepository);
container.registerSingleton<IVoteRepository>(VoteRepository.name, VoteRepository);
container.registerSingleton<IEmailService>(EmailService.name, EmailService);
