import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ContainerProps {
	backgroundColor: string;
}

export const Container = styled.KeyboardAvoidingView<ContainerProps>`
	background-color: ${(props) => props.backgroundColor};
	flex: 1;
	margin-top: ${height * 0.01}px;
	margin-bottom: ${height * 0.01}px;
`;

export const SignUpArea = styled.KeyboardAvoidingView`
	flex: 2;
	padding: 30px;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export const SignUpButton = styled.TouchableOpacity`
	width: 100%;
	height: 55px;
	background-color: #536dfe;
	border-radius: 30px;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
`;

export const SignUpButtonText = styled.Text`
	font-size: 18px;
	color: #ffffff;
	font-weight: bold;
`;

export const SignInMessageButton = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	margin-top: 30px;
	margin-bottom: 20px;
`;

export const SignInMessageButtonText = styled.Text`
	font-size: 16px;
	color: #536dfe;
`;

export const SignInMessageButtonTextBold = styled.Text`
	font-size: 16px;
	color: #536dfe;
	font-weight: bold;
	margin-left: 5px;
`;
