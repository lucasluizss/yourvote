import React, { useEffect, useState } from 'react';

import * as Api from '../../services/api.service';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import {
	Container,
	InviteArea,
	AddButton,
	AddButtonText
} from './styles';
import { Alert } from 'react-native';
import SessionModel from '../../models/SessionModel';
import InputSelect from '../../components/InputSelect';

export default () => {
	const colorScheme = useColorScheme();
	const [emailField, setEmailField] = useState<string>('');
	const [sessionIdField, setSessionIdField] = useState<string>('0');
	const [sessions, setSessions] = useState<SessionModel[]>([]);

	useEffect(() => {
		const getSessions = async () => {
			const { data: sessionsResponse } = await Api.getAllSessions();

			if (sessionsResponse.successed) {
				setSessions(sessionsResponse.data);
			} else {
				Alert.alert('Opss!', sessionsResponse.message);
			}
		};

		getSessions();
	}, []);

	const handleSendInvite = async () => {
		if (!sessionIdField || !emailField) {
			Alert.alert('Opss!', 'Você precisa informar ambos os campos!');
			return;
		}

		const { data: inviteResponse } = await Api.sendInvite({
			email: emailField,
			sessionId: sessionIdField,
		});

		if (inviteResponse.successed) {
			Alert.alert(
				'Sucesso!',
				`Convite para ${emailField} enviado com sucesso!`
			);
			setEmailField('');
			setSessionIdField('');
		} else {
			Alert.alert('Opss!', inviteResponse.message);
		}
	};

	return (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Header title='Convidar Eleitor' />

			<InviteArea>
				<InputSelect
					icon='book'
					label='Selecione a sessão...'
					onValueChange={setSessionIdField}
					value={sessionIdField}
					items={sessions.map(session => ({
						label: session.title,
						value: session._id,
					}))}
				/>

				<Input
					icon='mail'
					value={emailField}
					onChangeText={setEmailField}
					placeholder='Email do eleitor convidado'
				/>

				<AddButton onPress={handleSendInvite}>
					<AddButtonText>ENVIAR</AddButtonText>
				</AddButton>
			</InviteArea>
		</Container>
	);
};
