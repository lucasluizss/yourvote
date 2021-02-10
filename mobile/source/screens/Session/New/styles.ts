import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ContainerProps {
	backgroundColor: string;
}

export const Container = styled.KeyboardAvoidingView<ContainerProps>`
	background-color: ${props => props.backgroundColor};
	flex: 1;
	margin-top: ${height * 0.02}px;
	margin-bottom: ${height * 0.02}px;
`;

export const FormArea = styled.View`
	padding: 20px;
`;

interface UserCardProps {
	selected: boolean;
}

export const UserCard = styled.TouchableOpacity<UserCardProps>`
	width: 160px;
	height: 160px;
	box-shadow: 4px 1px 5px #5a786e;
	background-color: #f1f2ff;
	padding: 10px;
	flex-direction: column;
	border-width: ${props => (props.selected ? '5px' : 0)};
	border-color: #536dfe;
	align-items: center;
	margin: 0 10px 10px 0;
	border-radius: 10px;
`;

export const UserImage = styled.Image`
	width: 80px;
	height: 80px;
	border-radius: 50px;
`;

export const UserName = styled.Text`
	font-size: 17px;
	color: #6e6c7a;
	margin-top: 5px;
`;

export const UserEmail = styled.Text`
	font-size: 14px;
	font-weight: bold;
	color: #6e6c7a;
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
