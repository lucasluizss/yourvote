import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import * as Api from '../../../services/api.service';
import Input from '../../../components/Input';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import Loading from '../../../components/Loading';
import Header from '../../../components/Header';
import InputDate from '../../../components/InputDate';
import UserAvatar from '../../../assets/icons/undraw_male_avatar_323b.svg';
import {
	Container,
	FormArea,
	AddButton,
	AddButtonText,
	UserCard,
	UserImage,
	UserName,
	UserEmail,
} from './styles';
import UserModel from '../../../models/UserModel';
import SessionModel from '../../../models/SessionModel';

export default () => {
	const colorScheme = useColorScheme();
	const today = new Date();
	const { navigate, reset } = useNavigation();

	const [loading, setLoading] = useState<boolean>(false);
	const [titleField, setTitleField] = useState('');
	const [descriptionField, setDescriptionField] = useState('');
	const [startAtField, setStartAtField] = useState<Date>();
	const [expireAtField, setExpireAtField] = useState<Date>();
	const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
	const [userFilter, setUserFilter] = useState<string>('');
	const [users, setUsers] = useState<UserModel[]>([]);
	const [usersTemp, setUsersTemp] = useState<UserModel[]>([]);

	useEffect(() => {
		setLoading(true);
		const loadUsers = async () => {
			const { data: usersResponse } = await Api.getUsers();
			setUsersTemp(usersResponse.data);
			setUsers(usersResponse.data);
			setLoading(false);
		};
		loadUsers();
	}, []);

	const handleCreateSession = async () => {
		setLoading(true);

		if (!formIsValid()) return;

		const newSession = {
			title: titleField,
			description: descriptionField,
			startAt: startAtField,
			expireAt: expireAtField,
			candidatesIds: selectedUsersIds,
		} as SessionModel;

		console.log(newSession);

		const { data: sessionResponse } = await Api.createSession(newSession);

		if (sessionResponse.successed) {
			setLoading(false);
			Alert.alert('Sessão cadastrada com sucesso!');
			setTitleField('');
			setDescriptionField('');
			setStartAtField(today);
			setExpireAtField(today);
			setSelectedUsersIds([]);

			navigate('Sessions');
		} else {
			setLoading(false);
			Alert.alert('Opps!', sessionResponse.message);
		}
	};

	const formIsValid = () => {
		if (titleField) {
			Alert.alert('Favor preencher o título');
			return false;
		}

		if (descriptionField) {
			Alert.alert('Favor preencher a descrição');
			return false;
		}

		if (startAtField) {
			Alert.alert('Favor preencher a data início');
			return false;
		}

		if (expireAtField) {
			Alert.alert('Favor preencher a data fim');
			return false;
		}

		if (selectedUsersIds) {
			Alert.alert('Favor informar os candidatos');
			return false;
		}

		return true;
	};

	const handleSelectUser = (userId: string) => {
		if (selectedUsersIds.includes(userId)) {
			setSelectedUsersIds(selectedUsersIds.filter(id => id !== userId));
		} else {
			setSelectedUsersIds([...selectedUsersIds, userId]);
		}
	};

	const filterUsers = (text: string) => {
		setUserFilter(text);

		const usersFiltered = users.filter(item => {
			const itemData = `${item.name.toUpperCase()} ${item.email.toUpperCase()}`;
			return itemData.indexOf(userFilter.toUpperCase()) > -1;
		});

		setUsersTemp(usersFiltered);
	};

	return loading ? (
		<Loading />
	) : (
		<Container
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			backgroundColor={Colors[colorScheme].background}
		>
			<Header title='Nova Sessão' />

			<ScrollView showsVerticalScrollIndicator={false}>
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
						maxLength={27}
					/>

					<InputDate
						label={`Data de Início ${startAtField?.toLocaleDateString()}`}
						minimumDate={today}
						onConfirm={date => setStartAtField(date)}
						onCancel={() => setStartAtField(today)}
					/>

					<InputDate
						label={`Data de término ${expireAtField?.toLocaleDateString()}`}
						minimumDate={today}
						onConfirm={date => setExpireAtField(date)}
						onCancel={() => setExpireAtField(today)}
					/>

					<Input
						value={userFilter}
						onChangeText={text => filterUsers(text)}
						placeholder='Filtrar usuários'
						icon='search'
						autoCorrect={false}
						maxLength={27}
					/>

					<ScrollView
						horizontal
						style={{ marginTop: 5, marginBottom: 10, padding: 5 }}
					>
						{usersTemp.map((item, key) => (
							<UserCard
								key={key}
								onPress={() => item.id && handleSelectUser(item.id)}
								selected={selectedUsersIds.includes(item.id || '')}
							>
								{item?.avatar ? (
									<UserImage source={{ uri: item.avatar }} />
								) : (
									<UserAvatar width={80} height={80} />
								)}
								<UserName>{item.name}</UserName>
								<UserEmail>{item.email}</UserEmail>
							</UserCard>
						))}
					</ScrollView>

					<AddButton onPress={handleCreateSession}>
						<AddButtonText>CADASTRAR</AddButtonText>
					</AddButton>
				</FormArea>
			</ScrollView>
		</Container>
	);
};
