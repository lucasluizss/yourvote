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

export const InputArea = styled.View`
	width: 100%;
	padding: 20px;
	justify-content: flex-start;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const InputSearchArea = styled.View`
	height: 55px;
	flex-direction: row;
	border-width: 3px;
	border-radius: 30px;
	border-color: #536dfe;
	align-items: center;
	padding-left: 15px;
`;

export const InputSearch = styled.TextInput.attrs({
	placeholderTextColor: '#536DFE',
})`
	width: 100%;
	margin-left: 10px;
	font-size: 17px;
	font-weight: bold;
	color: #536dfe;
`;

export const CenterArea = styled.View`
	padding: 0 20px;
	justify-content: center;
	align-items: center;
`;

export const TitleArea = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 15px;
`;

export const Title = styled.Text`
	font-size: 25px;
	font-weight: bold;
	color: ${(props: TextProps) => props.color || '#536DFE'};
	margin-left: 10px;
`;

export const ListArea = styled.View`
	flex: 1;
	padding: 20px;
`;
