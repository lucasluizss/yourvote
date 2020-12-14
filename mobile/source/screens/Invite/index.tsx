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
	AddButtonText,
	Select,
	Option,
} from './styles';
import { Alert } from 'react-native';
import SessionModel from '../../models/SessionModel';

export default () => {
	const colorScheme = useColorScheme();
	const [emailField, setEmailField] = useState<string>('');
	const [sessionIdField, setSessionIdField] = useState<string>('');
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
				<Select
					mode='dropdown'
					selectedValue={sessionIdField}
					onValueChange={(itemValue, _) => setSessionIdField(itemValue)}
					itemStyle={{
						height: 55,
						color: '#536DFE',
						marginTop: -2,
					}}
				>
					<Select.Item label='Selecione' value='' />
					{sessions.map((item, key) => (
						<Select.Item key={key} label={item.title} value={item._id} />
					))}
				</Select>

				<Input
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
