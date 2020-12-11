import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { ColorValue, TextInput, TextInputProps } from 'react-native';

const InputArea = styled.View`
	width: 100%;
	justify-content: flex-start;
	margin-bottom: 15px;
`;

const InputSearchArea = styled.View`
	height: 55px;
	flex-direction: row;
	border-width: 3px;
	border-radius: 30px;
	border-color: #536dfe;
	align-items: center;
	padding-left: 15px;
`;

const InputSearch = styled.TextInput.attrs<TextInput>({
	placeholderTextColor: '#536DFE',
	fontWeight: 'bold',
})`
	width: 100%;
	margin-left: 10px;
	font-size: 17px;
	font-weight: bold;
	color: #536dfe;
`;

interface InputProps extends TextInputProps {
	icon?: string;
}

export default ({ icon, ...rest }: InputProps) => {
	return (
		<InputArea>
			<InputSearchArea>
				{icon && <Feather name={icon} size={20} color='#536DFE' />}
				<InputSearch keyboardAppearance='dark' {...rest} />
			</InputSearchArea>
		</InputArea>
	);
};
