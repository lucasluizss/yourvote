import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AccountService from './account.service';
import Result from '../../infra/core/factories/result.factory';
import UserFactory from '../../infra/core/factories/user.factory';
import { verifyJwtToken } from '../../infra/core/security';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const {
      email,
      password,
      ipAddress = request.ip,
      device = request.host,
    } = request.body;

    try {
      const accountService = container.resolve(AccountService);

      const jwtToken = await accountService.authenticate(
        email,
        password,
        ipAddress,
        device,
      );

      const user = await accountService.getUserByEmail(email);
      const userResponse = UserFactory.create(user);

      return response.json(
        Result.Success({ token: jwtToken, user: userResponse }),
      );
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async refresh(request: Request, response: Response) {
    const { authorization } = request.headers;

    try {
      if (authorization) {
        const userId = await verifyJwtToken(authorization);

        return response.json(
          userId
            ? Result.Success(userId)
            : Result.Fail('Token inválido'),
        );
      }

      return response.json(Result.Fail('Nenhum token foi forncecido'));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async logout(request: Request, response: Response) {
    const { authorization } = request.headers;

    try {
      const accountService = container.resolve(AccountService);

      await accountService.logout(String(authorization));

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async activeUser(request: Request, response: Response) {
    const { id } = request.body;

    try {
      const accountService = container.resolve(AccountService);

      await accountService.activeUser(id);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async comfirmEmail(request: Request, response: Response) {
    const { token } = request.params;

    try {
      const accountService = container.resolve(AccountService);

      await accountService.confirmEmail(token);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async makeAdmin(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const accountService = container.resolve(AccountService);

      await accountService.makeAdmin(id);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const accountService = container.resolve(AccountService);

      await accountService.forgotPassword(email);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  async resetPassword(request: Request, response: Response) {
    const { email, password, confirmPassword } = request.body;

    try {
      const accountService = container.resolve(AccountService);

      if (password !== confirmPassword) {
        return response.json(Result.Fail('Senhas não coincidem!'));
      }

      await accountService.resetPassword(email, password);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }
}

export default new AuthController();
