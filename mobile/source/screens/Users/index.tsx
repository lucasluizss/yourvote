import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import * as Api from '../../services/api.service';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import UserIconAvatar from '../../assets/icons/undraw_male_avatar_323b.svg';
import {
	Container,
	ItemsArea,
	UserProfileCard,
	UserAvatar,
	UserDetailArea,
	UserName,
	UserEmail,
	IconArea,
	UserSwitch,
} from './styles';
import UserModel from '../../models/UserModel';
import { Alert } from 'react-native';
import { Status } from '../../models/Enums';
import Loading from '../../components/Loading';

export default () => {
	const colorScheme = useColorScheme();
	const { navigate } = useNavigation();
	const [loading, setLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<UserModel[]>([]);

	useEffect(() => {
		setLoading(true);
		const loadUsers = async () => {
			const { data: usersResponse } = await Api.getUsers();
			setUsers(usersResponse.data);
			setLoading(false);
		};
		loadUsers();
	}, []);

	const toggleSwitch = async (userId?: string) => {
		setLoading(true);
		const { data: activeResponse } = await Api.activeUser(userId);

		if (activeResponse.successed) {
			setUsers(
				users.map(item => {
					if (item.id === userId) {
						return {
							...item,
							status:
								item.status === Status.Active ? Status.Inactive : Status.Active,
						};
					} else {
						return item;
					}
				})
			);
			Alert.alert('Sucesso!', 'Usuário ativado.');
		} else {
			Alert.alert('Opss!', 'Por favor tente novamente');
		}

		setLoading(false);
	};

	return loading ? (
		<Loading />
	) : (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Header
				title='Gerenciar Usuários'
				addButtonVisible
				actionAddButton={() => navigate('SignUp')}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ItemsArea>
					{users.map((user, key) => (
						<UserProfileCard key={key} onPress={() => {}}>
							{user.avatar ? (
								<UserAvatar source={{ uri: user.avatar }} />
							) : (
								<UserIconAvatar width={50} height={50} />
							)}
							<UserDetailArea>
								<UserName>{user.name}</UserName>
								<UserEmail>{user.email}</UserEmail>
							</UserDetailArea>
							<IconArea>
								<UserSwitch
									active={user.status === Status.Active}
									onValueChange={() => toggleSwitch(user.id)}
									value={user.status === Status.Active}
								/>
							</IconArea>
						</UserProfileCard>
					))}
				</ItemsArea>
			</ScrollView>
		</Container>
	);
};
