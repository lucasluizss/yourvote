import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {
	AuthenticationModel,
	SignUpModel,
} from '../models/AuthenticationModel';
import SessionModel from '../models/SessionModel';
import UserModel from '../models/UserModel';
import VoteModel from '../models/VoteModel';

const baseUrl = 'https://yourvot3.herokuapp.com/v1';

export const Api = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
});

export const authenticate = async (data: AuthenticationModel) => {
	return await Api.post('accounts/authenticate', data);
};

export const signUp = async (data: SignUpModel) => {
	return await Api.post('users', data);
};

export const logout = async () => {
	await AsyncStorage.removeItem('@YourVote:token');
	return await Api.post('accounts/logout');
};

export const activeUser = async (userId?: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };
	const body = { id: userId };
	return await Api.post(`accounts/active`, body, { headers });
};

export const validateAccessCode = async (accessCode: string) => {
	return await Api.post(`guest-voters/guest`, { accessCode });
};

export const getLoggedUser = async () => {
	const userFromStorage = await AsyncStorage.getItem('@YourVote:user');

	if (userFromStorage) {
		const parsedUser = JSON.parse(userFromStorage);
		return { ...parsedUser, _id: parsedUser.id } as UserModel;
	}

	return {} as UserModel;
};

export const getUserById = async (id: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`users/${id}`, { headers });
};

export const refreshToken = async () => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.post(`accounts/refresh`, { headers });
};

export const activeSession = async (sessionId?: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.post(`sessions/active`, { sessionId }, { headers });
};

export const getAllSessions = async () => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`sessions`, { headers });
};

export const getCurrentSessions = async () => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`sessions/current`, { headers });
};

export const getPastSessions = async () => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`sessions/expired`, { headers });
};

export const deleteSession = async (sessionId: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.delete(`sessions/${sessionId}`, { headers });
};

export const createSession = async (session: SessionModel) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.post(`sessions`, session, { headers });
};

export const getFutureSessions = async () => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`sessions/future`, { headers });
};

export const getSessionById = async (id?: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`sessions/${id}`, { headers });
};

export const createCandidate = async (sessionId: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.post(`candidates`, { sessionId, code: null }, { headers });
};

export const getCandidatesBySessionId = async (id?: string) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`candidates/session/${id}`, { headers });
};

export const registerVote = async (request: VoteModel) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.post(`votes`, request, { headers });
};

export const getUsers = async () => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.get(`users`, { headers });
};

export const sendInvite = async ({
	email,
	sessionId,
}: {
	email: string;
	sessionId: string;
}) => {
	const token = await AsyncStorage.getItem('@YourVote:token');
	const headers = { Authorization: `Bearer ${token}` };

	return await Api.post(`guest-voters`, { email, sessionId }, { headers });
};
