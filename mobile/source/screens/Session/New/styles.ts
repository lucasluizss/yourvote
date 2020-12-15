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

export const AddButton = styled.TouchableOpacity`
	width: 100%;
	height: 55px;
	background-color: #536dfe;
	border-radius: 30px;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
`;

export const AddButtonText = styled.Text`
	font-size: 18px;
	color: #ffffff;
	font-weight: bold;
`;