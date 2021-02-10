import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

const InputSelectArea = styled.View`
	width: 100%;
	justify-content: flex-start;
	margin-bottom: 15px;
`;

const InputSelectSearchArea = styled.View`
	height: 55px;
	flex-direction: row;
	border-width: 3px;
	border-radius: 30px;
	border-color: #536dfe;
	align-items: center;
	padding-left: 15px;
`;

interface InputSelectProps extends PickerSelectProps {
	icon?: string;
	label: string;
}

export default ({ icon, label, ...rest }: InputSelectProps) => {
	return (
		<InputSelectArea>
			<InputSelectSearchArea>
				{icon && <Feather name={icon} size={20} color='#536DFE' />}
				<RNPickerSelect
					{...rest}
					placeholder={{
						label: label,
						value: '0',
						color: '#536dfe',
					}}
					style={{
						placeholder: {
							color: '#536dfe',
						},
						inputIOS: {
							height: 50,
							marginLeft: 10,
							fontSize: 17,
							fontWeight: 'bold',
							color: '#536dfe',
						},
						inputAndroid: {
							height: 50,
							marginLeft: 10,
							fontSize: 17,
							fontWeight: 'bold',
							color: '#536dfe',
						},
					}}
				/>
			</InputSelectSearchArea>
		</InputSelectArea>
	);
};
