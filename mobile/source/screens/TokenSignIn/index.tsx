import { Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import * as Api from '../../services/api.service';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import TokenSignInLogo from '../../assets/icons/undraw_authentication_fsn5.svg';
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

export default () => {
	const colorScheme = useColorScheme();
	const { navigate } = useNavigation();
	const [loading, setLoading] = useState<boolean>(false);
	const [tokenField, setTokenField] = useState<string>('');

	const handleSignIn = async () => {
		setLoading(true);
		if (!tokenField) {
			Alert.alert('Opss!', 'Favor informar o código de acesso');
			return;
		}

		const { data: guestResponse } = await Api.validateAccessCode(tokenField);
		setLoading(false);

		if (guestResponse.successed) {
			const { sessionId } = guestResponse.data;

			navigate('Session', { sessionId, accessCode: tokenField });
		} else {
			Alert.alert('Opss!', guestResponse.message);
		}
	};

	return loading ? (
		<Loading message='Iniciando...' />
	) : (
		<Container
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			backgroundColor={Colors[colorScheme].background}
		>
			<SignInArea>
				<TokenSignInLogo width={250} height={250} />

				<Input
					value={tokenField}
					onChangeText={setTokenField}
					placeholder='Token'
					icon='key'
					autoCapitalize='characters'
					maxLength={10}
				/>

				<SignInButton onPress={handleSignIn}>
					<SignInButtonText>ENTRAR</SignInButtonText>
				</SignInButton>

				<SignUpMessageButton onPress={() => navigate('SignIn')}>
					<SignUpMessageButtonText>Possui uma conta?</SignUpMessageButtonText>
					<SignUpMessageButtonTextBold>Fazer login</SignUpMessageButtonTextBold>
				</SignUpMessageButton>
			</SignInArea>
		</Container>
	);
};
