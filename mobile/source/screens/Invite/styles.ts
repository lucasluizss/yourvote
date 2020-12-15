import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

interface ContainerProps {
	backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
	background-color: ${props => props.backgroundColor};
	flex: 1;
`;

export const InviteArea = styled.View`
	padding: 20px;
	align-items: center;
	justify-content: center;
`;

export const Select = styled(Picker)`
	width: 100%;
	height: 55px;
	border-color: #536dfe;
	border-width: 3px;
	border-radius: 25px;
	background-color: #fff;
	margin-bottom: 15px;
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
