import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';

import * as Api from '../../services/api.service';
import { Container, Title } from './styles';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Logo from '../../assets/icons/undraw_voting_nvu7.svg';

export default () => {
	const colorScheme = useColorScheme();
	const { reset } = useNavigation();

	useEffect(() => {
		const loadInformation = async () => {
			const token = await AsyncStorage.getItem('@YourVote:token');

			if (token) {
				const { data } = await Api.refreshToken();

				if (data.successed) {
					reset({ routes: [{ name: 'Root' }] });
				} else {
					reset({ routes: [{ name: 'SignIn' }] });
				}
			} else {
				reset({ routes: [{ name: 'SignIn' }] });
			}
		};

		loadInformation();
	}, []);

	return (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Logo width={250} height={250} />
			<Title>YourVote</Title>
			<ActivityIndicator size='large' color='#536dfe' />
		</Container>
	);
};
