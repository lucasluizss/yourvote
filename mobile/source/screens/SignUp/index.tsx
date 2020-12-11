import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import * as Api from '../../services/api.service';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import SignUpLogo from '../../assets/icons/undraw_welcome_cats_thqn.svg';
import {
	Container,
	SignUpArea,
	SignUpButton,
	SignUpButtonText,
	SignInMessageButton,
	SignInMessageButtonText,
	SignInMessageButtonTextBold,
} from './styles';
import Loading from '../../components/Loading';

export default () => {
	const colorScheme = useColorScheme();
	const { navigate, reset } = useNavigation();

	const [loading, setLoading] = useState<boolean>(false);
	const [nameField, setNameField] = useState<string>('');
	const [emailField, setEmailField] = useState<string>('');
	const [phoneField, setPhoneField] = useState<string>('');
	const [passwordField, setPasswordField] = useState<string>('');
	const [passwordConfirmField, setPasswordConfirmField] = useState<string>('');

	const handleSignUp = async () => {
		if (!formIsValid()) return;

		setLoading(true);

		const { data } = await Api.signUp({
			username: emailField.split('@')[0],
			name: nameField,
			email: emailField,
			password: passwordField,
			phone: phoneField,
		});

		setLoading(false);

		if (data.successed) {
			setNameField('');
			setEmailField('');
			setPhoneField('');
			setPasswordField('');
			setPasswordConfirmField('');

			Alert.alert(
				'Cadastro realizado com sucesso!',
				'Deseja realizar o login automático?',
				[
					{ text: 'Sim', onPress: () => automaticSignIn() },
					{
						text: 'Não',
						onPress: () => navigate('SignIn'),
						style: 'cancel',
					},
				],
				{ cancelable: false }
			);
		}
	};

	const automaticSignIn = async () => {
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

	const formIsValid = () => {
		if (!nameField) {
			Alert.alert('Favor preencher o nome');
			return false;
		}

		if (!emailField) {
			Alert.alert('Favor preencher o email');
			return false;
		}

		if (!phoneField) {
			Alert.alert('Favor preencher o telefone');
			return false;
		}

		if (!passwordField) {
			Alert.alert('Favor preencher a senha');
			return false;
		}

		if (!passwordConfirmField) {
			Alert.alert('Favor preencher a confirmação da senha');
			return false;
		}

		if (passwordField !== passwordConfirmField) {
			Alert.alert('Senhas não coincidem');
			return false;
		}

		return true;
	};

	return loading ? (
		<Loading message='Finalizando cadastro...' />
	) : (
		<Container
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			backgroundColor={Colors[colorScheme].background}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<SignUpArea>
					<SignUpLogo width={250} height={250} />

					<Input
						value={nameField}
						onChangeText={setNameField}
						placeholder='Nome'
						icon='user'
						autoCapitalize='words'
						maxLength={27}
					/>

					<Input
						value={phoneField}
						onChangeText={setPhoneField}
						placeholder='Telefone'
						icon='phone'
						keyboardType='phone-pad'
						maxLength={27}
					/>

					<Input
						value={emailField}
						onChangeText={setEmailField}
						placeholder='Email'
						icon='mail'
						keyboardType='email-address'
						autoCapitalize='none'
						maxLength={27}
					/>

					<Input
						value={passwordField}
						onChangeText={setPasswordField}
						placeholder='Senha'
						icon='key'
						secureTextEntry
						maxLength={27}
					/>

					<Input
						value={passwordConfirmField}
						onChangeText={setPasswordConfirmField}
						placeholder='Confirmar Senha'
						icon='key'
						secureTextEntry
						maxLength={27}
					/>

					<SignUpButton onPress={handleSignUp}>
						<SignUpButtonText>CADASTRAR</SignUpButtonText>
					</SignUpButton>

					<SignInMessageButton onPress={() => navigate('SignIn')}>
						<SignInMessageButtonText>Possui uma conta?</SignInMessageButtonText>
						<SignInMessageButtonTextBold>Entre</SignInMessageButtonTextBold>
					</SignInMessageButton>
				</SignUpArea>
			</ScrollView>
		</Container>
	);
};
