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

export default () => {
	const colorScheme = useColorScheme();
	const today = new Date();
	const { navigate, reset } = useNavigation();

	const [loading, setLoading] = useState<boolean>(false);
	const [titleField, setTitleField] = useState('');
	const [descriptionField, setDescriptionField] = useState('');
	const [startAtField, setStartAtField] = useState<Date>(today);
	const [expireAtField, setExpireAtField] = useState<Date>(today);
	const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
	const [userFilter, setUserFilter] = useState<string>('');
	const [users, setUsers] = useState<UserModel[]>([]);
	const [usersTemp, setUsersTemp] = useState<UserModel[]>([]);

	useEffect(() => {
		setLoading(true);
		const loadUsers = async () => {
			const { data: usersResponse } = await Api.getUsers();
			setUsers(usersResponse.data);
			setUsersTemp(usersResponse.data);
			setLoading(false);
		};
		loadUsers();
	}, []);

	const handleCreateSession = async () => {
		setLoading(true);
		const newSession = {
			title: titleField,
			description: descriptionField,
			startAt: startAtField,
			expireAt: expireAtField,
			candidatesIds: selectedUsersIds,
		};

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

					<Input
						value={userFilter}
						onChangeText={text => filterUsers(text)}
						placeholder='Filtrar usuários'
						icon='search'
						autoCorrect={false}
						maxLength={27}
					/>

					<ScrollView horizontal style={{ marginTop: 5, marginBottom: 10 }}>
						{usersTemp.map((item, key) => (
							<UserCard
								key={key}
								onPress={() => item.id && handleSelectUser(item.id)}
								selected={selectedUsersIds.includes(item.id || '')}
							>
								{item?.avatar ? (
									<UserImage source={{ uri: item.avatar }} />
								) : (
									<UserAvatar width={70} height={70} />
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
