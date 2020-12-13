import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Text } from '../../components/Themed';

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
`;

export const FormArea = styled.View`
	padding: 20px;
`;

export const SessionCard = styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	padding: 15px;
	box-shadow: 4px 1px 5px #5a786e;
	background-color: #ffffff;
	border-radius: 10px;
	justify-content: space-between;
	margin-bottom: 15px;
`;

export const SessionDetailArea = styled.View`
	flex: 2;
	flex-direction: column;
`;

export const SessionTitle = styled(Text)`
	font-size: 20px;
	font-weight: bold;
`;

export const SessionDescription = styled(Text)`
	font-size: 18px;
`;

export const DateView = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const SessionDateDescription = styled(Text)`
	font-size: 18px;
	margin: 10px 0px 5px 5px;
`;

export const IconArea = styled.View``;

export const SessionSwitch = styled.Switch``;

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

export const SessionDateArea = styled.View`
	flex-direction: row;
`;
