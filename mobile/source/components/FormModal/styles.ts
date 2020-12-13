import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const ModalArea = styled.KeyboardAvoidingView`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.5);
	justify-content: flex-end;
`;

export const ModalBody = styled.View`
	background-color: #536dfe;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	
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
