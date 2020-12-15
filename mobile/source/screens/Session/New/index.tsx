import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import * as Api from '../../../services/api.service';
import Input from '../../../components/Input';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { Container, AddButton, AddButtonText } from './styles';
import Loading from '../../../components/Loading';
import Header from '../../../components/Header';
import InputDate from '../../../components/InputDate';

export default function NewSession() {
	const colorScheme = useColorScheme();
	const today = new Date();
	const { navigate, reset } = useNavigation();

	const [loading, setLoading] = useState<boolean>(false);
	const [titleField, setTitleField] = useState('');
	const [descriptionField, setDescriptionField] = useState('');
	const [startAtField, setStartAtField] = useState<Date>(today);
	const [expireAtField, setExpireAtField] = useState<Date>(today);

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
			setTitleField('');
			setDescriptionField('');
			setStartAtField(today);
			setExpireAtField(today);

			navigate('Sessions');
		} else {
			setLoading(false);
			Alert.alert('Opps!', sessionResponse.message);
		}
	};
	return loading ? (
		<Loading />
	) : (
		<Container
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			backgroundColor={Colors[colorScheme].background}
		>
			<Header title='Nova Sessão' />
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
		</Container>
	);
}
