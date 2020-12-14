import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import * as Api from '../../services/api.service';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Role, Status } from '../../models/Enums';
import SessionModel from '../../models/SessionModel';
import {
	Container,
	ItemsArea,
	SessionCard,
	SessionDetailArea,
	SessionTitle,
	SessionDescription,
	IconArea,
	SessionSwitch,
	DateView,
	SessionDateDescription,
	AddButton,
	AddButtonText,
} from './styles';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import InputDate from '../../components/InputDate';
import FormModal from '../../components/FormModal';

export default () => {
	const colorScheme = useColorScheme();
	const today = new Date();
	const [showForm, setShowForm] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [titleField, setTitleField] = useState('');
	const [descriptionField, setDescriptionField] = useState('');
	const [startAtField, setStartAtField] = useState<Date>(today);
	const [expireAtField, setExpireAtField] = useState<Date>(today);
	const [sessions, setSessions] = useState<SessionModel[]>([]);

	useEffect(() => {
		setLoading(true);

		const loadSessions = async () => {
			const { role } = await Api.getLoggedUser();

			if (role && role === Role.Admin) {
				const { data: sessionsResponse } = await Api.getAllSessions();
				setSessions(sessionsResponse.data);
			} else {
				const { data: sessionsResponse } = await Api.getCurrentSessions();
				setSessions(sessionsResponse.data);
			}

			setLoading(false);
		};

		loadSessions();
	}, []);

	const toggleSwitch = async (sessionId?: string) => {
		setLoading(true);
		const { data: sessionResponse } = await Api.activeSession(sessionId);

		if (sessionResponse.successed) {
			setLoading(false);
			setSessions(
				sessions.map(session =>
					session._id === sessionId
						? {
								...session,
								status:
									session.status === Status.Active
										? Status.Inactive
										: Status.Active,
						  }
						: session
				)
			);
			Alert.alert('Sucesso!', 'Sessão ativada.');
		} else {
			setLoading(false);
			Alert.alert('Opss!', sessionResponse.message);
		}
	};

	const handleCreateSession = async () => {
		setLoading(true);
		const newSession = {
			title: titleField,
			description: descriptionField,
			startAt: startAtField,
			expireAt: expireAtField,
		};

		const { data: sessionResponse } = await Api.createSession(newSession);

		if (sessionResponse.successed) {
			setLoading(false);
			Alert.alert('Sessão cadastrada com sucesso!');
			setSessions([...sessions, sessionResponse.data]);
			setTitleField('');
			setDescriptionField('');
			setStartAtField(today);
			setExpireAtField(today);
			setShowForm(false);
		} else {
			setLoading(false);
			Alert.alert('Opps!', sessionResponse.message);
		}
	};

	const handleApplyUserForSession = async (sessionId: string) => {
		setLoading(true);
		const { data: candidateResponse } = await Api.createCandidate(sessionId);

		if (candidateResponse.successed) {
			setLoading(false);
			Alert.alert('Candidatura submetida com sucesso!');
		} else {
			setLoading(false);
			Alert.alert('Opps!', candidateResponse.message);
		}
	};

	const handleDeleteSession = async (sessionId: string) => {
		setLoading(true);
		const { data: sessionResponse } = await Api.deleteSession(sessionId);

		if (sessionResponse.successed) {
			setLoading(false);
			setSessions(sessions.filter(session => session._id !== sessionId));
			Alert.alert('Sessão excluída com sucesso!');
		}
	};

	const handleShowOptionsClick = (sessionId: string) => {
		Alert.alert(
			'Ações',
			'O que deseja fazer com esta sessão?',
			[
				{
					text: 'Candidatar-se',
					onPress: () => handleApplyUserForSession(sessionId),
				},
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'Excluir', onPress: () => handleDeleteSession(sessionId) },
			],
			{ cancelable: false }
		);
	};

	return loading ? (
		<Loading />
	) : (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Header
				title='Minhas Sessões'
				addButtonVisible
				actionAddButton={() => setShowForm(!showForm)}
			/>

			<FormModal show={showForm} setShow={setShowForm}>
				<ScrollView>
					<Input
						value={titleField}
						onChangeText={setTitleField}
						placeholder='Título'
						icon='book'
						autoCapitalize='words'
						maxLength={27}
					/>

					<Input
						value={descriptionField}
						onChangeText={setDescriptionField}
						placeholder='Descrição'
						icon='book-open'
						autoCapitalize='words'
						maxLength={27}
					/>

					<InputDate
						label='Data de início'
						value={startAtField}
						minimumDate={today}
						onChange={(_, date) => setStartAtField(date || today)}
					/>

					<InputDate
						label='Data de término'
						value={expireAtField}
						minimumDate={today}
						onChange={(_, date) => setExpireAtField(date || today)}
					/>

					<AddButton onPress={handleCreateSession}>
						<AddButtonText>CADASTRAR</AddButtonText>
					</AddButton>
				</ScrollView>
			</FormModal>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ItemsArea>
					{sessions.map((session, key) => (
						<SessionCard
							key={key}
							onPress={() => session._id && handleShowOptionsClick(session._id)}
						>
							<SessionDetailArea>
								<SessionTitle>{session.title}</SessionTitle>
								<SessionDescription>{session.description}</SessionDescription>
								<DateView>
									<Feather size={18} name='calendar' color='#536DFE' />
									<SessionDateDescription>
										Começa em{' '}
										{session.startAt.toLocaleString().substring(0, 10)}
									</SessionDateDescription>
								</DateView>
								<DateView>
									<Feather size={18} name='calendar' color='#536DFE' />
									<SessionDateDescription>
										Termina em{' '}
										{session.expireAt.toLocaleString().substring(0, 10)}
									</SessionDateDescription>
								</DateView>
							</SessionDetailArea>
							<IconArea>
								<SessionSwitch
									onValueChange={() => toggleSwitch(session._id)}
									value={session.status === Status.Active}
								/>
							</IconArea>
						</SessionCard>
					))}
				</ItemsArea>
			</ScrollView>
		</Container>
	);
};
