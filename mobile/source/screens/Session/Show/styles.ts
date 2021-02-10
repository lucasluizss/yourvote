import styled from 'styled-components/native';
import { Text } from '../../../components/Themed';

interface ContainerProps {
	backgroundColor: string;
}

export const Container = styled.SafeAreaView`
	background-color: ${(props: ContainerProps) => props.backgroundColor};
	flex: 1;
`;

export const CenterArea = styled.View`
	padding: 10px 20px;
	justify-content: center;
	align-items: center;
`;

export const DescriptionArea = styled.View`
	width: 100%;
	padding: 10px;
	flex-direction: row;
	justify-content: space-between;
`;

export const DescriptionColumn = styled.View`
	flex: 2;
	flex-direction: column;
	padding: 0 5px;
`;

export const DescriptionText = styled(Text)`
	font-size: 20px;
	margin-bottom: 5px;
`;

export const ListArea = styled.View`
	flex: 1;
	padding: 20px;
	flex-wrap: wrap;
	flex-direction: row;
	margin-right: -20px;
`;

export const CandidateCard = styled.TouchableOpacity`
	width: 45%;
	box-shadow: 4px 1px 5px #5a786e;
	background-color: #f1f2ff;
	padding: 10px;
	flex-direction: column;
	align-items: center;
	margin: 0 10px 10px 0;
	border-radius: 10px;
`;

export const CandidateAvatar = styled.Image`
	width: 90px;
	height: 90px;
	border-radius: 50px;
`;

export const CandidateName = styled.Text`
	font-size: 20px;
	color: #6e6c7a;
`;

export const CandidateCode = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: #6e6c7a;
`;
