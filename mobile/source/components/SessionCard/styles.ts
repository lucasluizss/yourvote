import styled from 'styled-components/native';

export const SessionButton = styled.TouchableOpacity`
	width: 200px;
	border-width: 1px;
	border-color: #686c7e;
	background-color: #696c7e;
	border-radius: 10px;
	padding: 10px;
	margin-right: 10px;
`;

export const SessionButtonTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #f1f2ff;
`;

export const SessionButtonDescription = styled.Text`
	font-size: 15px;
	color: #f1f2ff;
	margin-bottom: 10px;
`;

export const DateView = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const SessionArea = styled.View`
	flex-direction: column;
	justify-content: center;
`;

export const SessionDateDescription = styled.Text`
	font-size: 15px;
	color: #f1f2ff;
	margin: 10px 0px 5px 5px;
`;
