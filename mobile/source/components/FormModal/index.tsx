import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
	Modal,
	ModalArea,
	ModalBody,
	CloseButton,
	ModalItem,
} from './styles';
import { ModalProps } from 'react-native';

interface Props extends ModalProps {
	show: boolean;
	setShow: (x: boolean) => void;
	children: React.ReactNode;
}

export default ({ show, setShow, children }: Props) => {
	const handleCloseButton = () => setShow(false);

	return (
		<Modal transparent visible={show} animationType='slide'>
			<ModalArea>
				<ModalBody>
					<CloseButton onPress={handleCloseButton}>
						<Feather name='x-circle' size={30} color='#FFFFFF' />
					</CloseButton>

					<ModalItem>{children}</ModalItem>
				</ModalBody>
			</ModalArea>
		</Modal>
	);
};
