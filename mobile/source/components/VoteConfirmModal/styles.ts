import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const ModalArea = styled.View`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.5);
	justify-content: flex-end;
`;

export const ModalBody = styled.View`
	background-color: #536dfe;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	min-height: 500px;
	padding: 10px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
	width: 40px;
	height: 40px;
`;

export const ModalItem = styled.View`
	background-color: #ffffff;
	border-radius: 10px;
	margin-top: 15px;
	padding: 10px;
`;

export const UserInfo = styled.View`
	flex-direction: column;
	align-items: center;
`;

export const UserAvatar = styled.Image`
	width: 150px;
	height: 150px;
	border-radius: 50px;
	margin-right: 15px;
`;

export const UserName = styled.Text`
	color: #03031b;
	font-size: 25px;
	font-weight: bold;
`;

export const UserCode = styled.Text`
	color: #03031b;
	font-size: 25px;
`;

export const FinishButton = styled.TouchableOpacity`
	background-color: #f50057;
	height: 50px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	margin-top: 15px;
`;

export const FinishButtonText = styled.Text`
	color: #f1f2ff;
	font-size: 17px;
	font-weight: bold;
`;

export const ActionArea = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 25px;
`;

export const ModalRejectButton = styled.TouchableOpacity``;

export const ModalConfirmButton = styled.TouchableOpacity``;
