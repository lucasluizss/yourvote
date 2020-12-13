import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as Api from '../../services/api.service';
import UserIconAvatar from '../../assets/icons/undraw_male_avatar_323b.svg';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import {
	Container,
	UserProfileCard,
	UserAvatar,
	ItemsArea,
	UserDetailArea,
	UserName,
	UserRole,
	LastLogin,
	OptionCard,
	OptionTitle,
	IconArea,
	LogoutButton,
	LogoutButtonText,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import UserModel from '../../models/UserModel';
import Loading from '../../components/Loading';
import { Role } from '../../models/Enums';

const menuOptions = [
	{
		title: 'Membros',
		icon: 'users',
		linkTo: 'Users',
		accessRole: [Role.Admin],
	},
	{
		title: 'Minhas Sessões',
		icon: 'book-open',
		linkTo: 'Sessions',
		accessRole: [Role.Admin, Role.User],
	},
	{
		title: 'Aprovações',
		icon: 'edit-3',
		linkTo: 'Sessions',
		accessRole: [Role.Admin],
	},
	{
		title: 'Configurações',
		icon: 'settings',
		linkTo: 'Settings',
		accessRole: [Role.Admin, Role.User],
	},
];

export default () => {
	const colorScheme = useColorScheme();
	const { navigate, reset } = useNavigation();
	
	const [user, setUser] = useState<UserModel | null>(null);

	useEffect(() => {
		const loadUser = async () => {
			const loggedUser = await Api.getLoggedUser();
			setUser(loggedUser);
		};

		loadUser();
	}, []);

	const handleLogoutClick = async () => {
		setUser(null);
		await Api.logout();
		reset({ routes: [{ name: 'SignIn' }] });
	};

	return !user ? (
		<Loading />
	) : (
		<Container backgroundColor={Colors[colorScheme].background}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ItemsArea>
					<UserProfileCard onPress={() => {}}>
						{user.avatar ? (
							<UserAvatar source={{ uri: user.avatar }} />
						) : (
							<UserIconAvatar width={90} height={90} />
						)}
						<UserDetailArea>
							<UserName>{user.name}</UserName>
							<UserRole>{Role[user.role]}</UserRole>
							<LastLogin>
								Último login em {new Date().toLocaleString()}
							</LastLogin>
						</UserDetailArea>
						<IconArea>
							<Feather name='chevron-right' size={20} />
						</IconArea>
					</UserProfileCard>

					{menuOptions
						.filter(item => item.accessRole.includes(user.role))
						.map((item, key) => (
							<OptionCard key={key} onPress={() => navigate(item.linkTo)}>
								<Feather name={item.icon} size={25} color='#6e6c7a' />
								<OptionTitle>{item.title}</OptionTitle>
								<IconArea>
									<Feather name='chevron-right' size={20} color='#6e6c7a' />
								</IconArea>
							</OptionCard>
						))}

					<LogoutButton onPress={handleLogoutClick}>
						<LogoutButtonText>SAIR</LogoutButtonText>
					</LogoutButton>
				</ItemsArea>
			</ScrollView>
		</Container>
	);
};
