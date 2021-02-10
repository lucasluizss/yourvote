import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal, {
	ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Text } from '../Themed';

const InputDateArea = styled.View`
	width: 100%;
	justify-content: flex-start;
	margin-bottom: 15px;
`;

const InputDateButton = styled.TouchableOpacity`
	flex: 1;
	border-width: 3px;
	border-radius: 30px;
	border-color: #536dfe;
	flex-direction: row;
	align-items: center;
	padding-left: 15px;
	height: 55px;
`;

const InputDateTime = styled(DateTimePicker)`
	width: 100%;
`;

const LabelText = styled(Text)`
	font-size: 17px;
	font-weight: bold;
	margin-left: 10px;
	margin-right: 5px;
`;

interface InputDateProps extends ReactNativeModalDateTimePickerProps {
	icon?: string;
	label: string;
}

export default ({ icon, label, ...rest }: InputDateProps) => {
	const [show, setShow] = useState(false);

	return (
		<InputDateArea>
			<InputDateButton onPress={() => setShow(!show)}>
				<Feather name='calendar' size={20} color='#536DFE' />
				<LabelText>{label}</LabelText>
			</InputDateButton>
			<DateTimePickerModal
				{...rest}
				cancelTextIOS='Fechar'
				confirmTextIOS='Confirmar'
				headerTextIOS={`Selecione a ${label}`}
				isVisible={show}
				mode={'date'}
				onCancel={() => setShow(false)}
			/>
		</InputDateArea>
	);
};
