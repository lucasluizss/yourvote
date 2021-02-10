import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ContainerProps {
	backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
	background-color: ${props => props.backgroundColor};
	flex: 1;
	margin-top: ${height * 0.01}px;
	margin-bottom: ${height * 0.01}px;
`;

export const ItemsArea = styled.View`
	padding: 20px;
	flex-direction: column;
	justify-content: space-between;
`;

export const UserProfileCard = styled.TouchableOpacity`
	width: 100%;
	height: 130px;
	box-shadow: 4px 1px 5px #5a786e;
	background-color: #ffffff;
	padding: 20px;
	flex-direction: row;
	flex-wrap: wrap;
	border-radius: 10px;
	margin-bottom: 15px;
	align-items: center;
	justify-content: center;
`;

export const UserAvatar = styled.Image`
	width: 50px;
	height: 50px;
`;

export const UserDetailArea = styled.View`
	flex: 1;
	padding: 15px;
	justify-content: flex-start;
	flex-direction: column;
`;

export const UserName = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #6e6c7a;
`;

export const UserEmail = styled.Text`
	font-size: 15px;
	color: #6e6c7a;
`;

export const IconArea = styled.View`
	margin-left: auto;
	justify-content: center;
`;

interface UserSwitchProps {
	active: boolean;
}

export const UserSwitch = styled.Switch.attrs<UserSwitchProps>({
  ios_backgroundColor: '#3e3e3e',
})<UserSwitchProps>``;
