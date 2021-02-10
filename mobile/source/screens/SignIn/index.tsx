import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import * as Api from '../../services/api.service';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import SignInLogo from '../../assets/icons/undraw_authentication_fsn5.svg';
import {
	Container,
	SignInArea,
	SignInButton,
	SignInButtonText,
	SignUpMessageButton,
	SignUpMessageButtonText,
	SignUpMessageButtonTextBold,
} from './styles';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
	const colorScheme = useColorScheme();
	const { navigate, reset } = useNavigation();
	const [loading, setLoading] = useState<boolean>(false);
	const [emailField, setEmailField] = useState<string>('lucasluizss@live.com');
	const [passwordField, setPasswordField] = useState<string>('123456');

	const handleSignIn = async () => {
		setLoading(true);
		const { data } = await Api.authenticate({
			email: emailField,
			password: passwordField,
		});

		setLoading(false);

		if (data.successed) {
			const { token, user } = data.data;

			await AsyncStorage.setItem('@YourVote:token', token);
			await AsyncStorage.setItem('@YourVote:user', JSON.stringify(user));

			reset({ routes: [{ name: 'Root' }] });
		} else {
			Alert.alert('Opss!', data.message);
		}
	};

	return loading ? (
		<Loading message='Iniciando...' />
	) : (
		<Container
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			backgroundColor={Colors[colorScheme].background}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<SignInArea>
					<SignInLogo width={250} height={250} />

					<Input
						value={emailField}
						onChangeText={setEmailField}
						placeholder='Email'
						icon='mail'
						keyboardType='email-address'
						autoCapitalize='none'
					/>

					<Input
						value={passwordField}
						onChangeText={setPasswordField}
						placeholder='Senha'
						icon='key'
						secureTextEntry
					/>

					<SignInButton onPress={handleSignIn}>
						<SignInButtonText>ENTRAR</SignInButtonText>
					</SignInButton>

					<SignUpMessageButton onPress={() => navigate('SignUp')}>
						<SignUpMessageButtonText>
							Não possui uma conta?
						</SignUpMessageButtonText>
						<SignUpMessageButtonTextBold>
							Cadastre-se
						</SignUpMessageButtonTextBold>
					</SignUpMessageButton>

					<SignUpMessageButton onPress={() => navigate('TokenSignIn')}>
						<SignUpMessageButtonText>
							Possui um código de convidado?
						</SignUpMessageButtonText>
						<SignUpMessageButtonTextBold>
							Prossiga para votação
						</SignUpMessageButtonTextBold>
					</SignUpMessageButton>
				</SignInArea>
			</ScrollView>
		</Container>
	);
};
