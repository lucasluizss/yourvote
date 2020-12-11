import React from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as Api from '../../services/api.service';
import UserAvatarDefault from '../../assets/icons/undraw_male_avatar_323b.svg';
import CandidateModel from '../../models/CandidateModel';
import {
	Modal,
	ModalArea,
	ModalBody,
	CloseButton,
	ModalItem,
	UserInfo,
	UserAvatar,
	UserName,
	UserCode,
	ActionArea,
	ModalRejectButton,
	ModalConfirmButton,
	FinishButton,
	FinishButtonText,
} from './styles';

interface Props {
	show: boolean;
	sessionId?: string;
	setShow: (x: boolean) => void;
	candidate?: CandidateModel;
}

export default ({ sessionId, show, setShow, candidate }: Props) => {
	const { navigate, reset } = useNavigation();

	const handleCloseButton = () => setShow(false);

	const handleCancelButton = () => {
		if (candidate) {
			setShow(false);
		} else {
			reset({ routes: [{ name: 'TokenSignIn' }] });
		}
	};

	const handleVoteClick = async () => {
		if (candidate) {
			const { data } = await Api.registerVote({
				candidateId: candidate._id,
				sessionId: sessionId,
			});

			if (data.successed) {
				Alert.alert('Sucesso!', 'Seu voto foi registrado!', [
					{ text: 'OK', onPress: () => navigate('Root') },
				]);
			} else {
				Alert.alert('Opss!!', data.message);
			}
		} else {
			Alert.alert('Sucesso!', 'Seu voto anônimo foi registrado!', [
				{ text: 'OK', onPress: () => reset({ routes: [{ name: 'SignIn' }] }) },
			]);
		}
	};

	const handleReportClick = async () => {};

	return (
		<Modal transparent visible={show} animationType='slide'>
			<ModalArea>
				<ModalBody>
					<CloseButton onPress={handleCloseButton}>
						<Feather name='minimize-2' size={25} color='#FFFFFF' />
					</CloseButton>

					<ModalItem>
						<UserInfo>
							{candidate?.avatar ? (
								<UserAvatar source={{ uri: candidate.avatar }} />
							) : (
								<UserAvatarDefault width={150} height={150} />
							)}
							<UserName>{candidate?.name}</UserName>
							<UserCode>{candidate?.code}</UserCode>
						</UserInfo>
					</ModalItem>

					<ModalItem>
						<ActionArea>
							<ModalRejectButton onPress={handleCancelButton}>
								<Feather name='x-square' size={120} color='#F50057' />
							</ModalRejectButton>
							<ModalConfirmButton onPress={handleVoteClick}>
								<Feather name='check-square' size={120} color='#00BFA6' />
							</ModalConfirmButton>
						</ActionArea>
					</ModalItem>

					<FinishButton onPress={handleReportClick}>
						<FinishButtonText>Reportar</FinishButtonText>
					</FinishButton>
				</ModalBody>
			</ModalArea>
		</Modal>
	);
};
