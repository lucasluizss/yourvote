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

export default () => {
	const colorScheme = useColorScheme();
	const { navigate, reset } = useNavigation();
	const [tokenField, setTokenField] = useState<string>('');

	const handleSignIn = async () => {
		if (!tokenField) {
			Alert.alert('Opss!', 'Favor informar o código de acesso');
			return;
		}

		const { data: guestResponse } = await Api.validateAccessCode(tokenField);

		if (guestResponse.successed) {
			reset({ routes: [{ name: 'Session' }] });
		} else {
			Alert.alert('Opss!', guestResponse.message);
		}
	};

	return (
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
