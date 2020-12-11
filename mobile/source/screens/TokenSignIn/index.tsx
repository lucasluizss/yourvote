import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
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
import { KeyboardAvoidingView, Platform } from 'react-native';

export default () => {
	const colorScheme = useColorScheme();
	const { navigate, reset } = useNavigation();
	const [tokenField, setTokenField] = useState<string>('');

	const handleSignIn = () => {
		// TODO:: obter sessão pelo token e ir para a tela da sessão
		reset({ routes: [{ name: 'Session' }] });
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
