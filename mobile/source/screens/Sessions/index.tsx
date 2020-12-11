import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Api from '../../services/api.service';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Status } from '../../models/Enums';
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
	FormArea,
	AddButton,
	AddButtonText,
	SessionDateArea,
} from './styles';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import { Alert } from 'react-native';

export default () => {
	const colorScheme = useColorScheme();
	const { navigate } = useNavigation();
	const [showForm, setShowForm] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [titleField, setTitleField] = useState('');
	const [descriptionField, setDescriptionField] = useState('');
	const [startAtField, setStartAtField] = useState<Date>(new Date());
	const [expireAtField, setExpireAtField] = useState<Date>(new Date());
	const [sessions, setSessions] = useState<SessionModel[]>([]);

	useEffect(() => {
		setLoading(true);
		const loadSessions = async () => {
			const { data: sessionsResponse } = await Api.getCurrentSessions();
			setSessions(sessionsResponse.data);
			setLoading(false);
		};

		loadSessions();
	}, []);

	const toggleSwitch = (sessionId?: string) => {
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
	};

	const onChangeStartDate = (_: any, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || new Date();
		setStartAtField(currentDate);
	};

	const onChangeExpireDate = (_: any, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || new Date();
		setExpireAtField(currentDate);
	};

	const handleCreateSession = async () => {
		const newSession = {
			title: titleField,
			description: descriptionField,
			startAt: startAtField,
			expireAt: expireAtField,
		};

		const { data: sessionResponse } = await Api.createSession(newSession);

		if (sessionResponse.successed) {
			Alert.alert('Sessão cadastrada com sucesso!');
			setSessions([...sessions, newSession]);
			setShowForm(false);
		}
	};

	return loading ? (
		<Loading />
	) : (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Header
				title='Gerenciar Sessões'
				addButtonVisible
				actionAddButton={() => setShowForm(!showForm)}
			/>

			{showForm && (
				<ScrollView>
					<FormArea>
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

						<DateTimePicker
							testID='dateTimePicker'
							value={startAtField}
							mode={'datetime'}
							display='default'
							onChange={onChangeStartDate}
							style={{
								marginBottom: 15,
							}}
						/>

						<DateTimePicker
							testID='dateTimePicker'
							value={expireAtField}
							mode={'datetime'}
							display='default'
							onChange={onChangeExpireDate}
							style={{
								marginBottom: 15,
							}}
						/>

						<AddButton onPress={handleCreateSession}>
							<AddButtonText>CADASTRAR</AddButtonText>
						</AddButton>
					</FormArea>
				</ScrollView>
			)}
			<ScrollView showsVerticalScrollIndicator={false}>
				<ItemsArea>
					{sessions.map((session, key) => (
						<SessionCard key={key} onPress={() => {}}>
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
