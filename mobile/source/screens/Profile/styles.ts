import styled from 'styled-components/native';

interface ContainerProps {
	backgroundColor: string;
}

interface TextProps {
	color?: string;
}

export const Container = styled.SafeAreaView`
	background-color: ${(props: ContainerProps) => props.backgroundColor};
	flex: 1;
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
`;

export const UserAvatar = styled.Image``;

export const UserDetailArea = styled.View`
	flex: 1;
	padding: 15px;
	justify-content: center;
	flex-direction: column;
`;

export const UserName = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #6e6c7a;
`;

export const UserRole = styled.Text`
	font-size: 15px;
	color: #6e6c7a;
`;

export const LastLogin = styled.Text`
	font-size: 15px;
	margin-top: 15px;
	color: #6e6c7a;
`;

export const Title = styled.Text`
	font-size: 50px;
	font-weight: bold;
	color: ${(props: TextProps) => props.color || '#03031B'};
`;

export const OptionCard = styled.TouchableOpacity`
	width: 100%;
	box-shadow: 4px 1px 5px #5a786e;
	background-color: #ffffff;
	padding: 20px;
	flex-direction: row;
	flex-wrap: wrap;
	border-radius: 10px;
	margin-top: 15px;
	align-items: center;
	justify-content: center;
`;

export const OptionTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #6e6c7a;
	margin-left: 15px;
`;

export const IconArea = styled.View`
	margin-left: auto;
	justify-content: center;
`;

export const LogoutButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #ee493f;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 40px 0px;
`;

export const LogoutButtonText = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;