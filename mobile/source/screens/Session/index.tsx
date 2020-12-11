import React, { useEffect, useState } from 'react';
import { Route, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import * as Api from '../../services/api.service';
import LogoIcon from '../../assets/icons/undraw_team_ih79.svg';
import UserAvatar from '../../assets/icons/undraw_male_avatar_323b.svg';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import {
	Container,
	CenterArea,
	ListArea,
	DescriptionArea,
	DescriptionColumn,
	DescriptionText,
	CandidateAvatar,
	CandidateCard,
	CandidateName,
	CandidateCode,
} from './styles';
import Input from '../../components/Input';
import VoteConfirmModal from '../../components/VoteConfirmModal';
import Header from '../../components/Header';
import CandidateModel from '../../models/CandidateModel';
import Loading from '../../components/Loading';

interface SessionProps {
	_id: string;
	createdAt: Date;
	description: string;
	expireAt: Date;
	startAt: Date;
	status: number;
	title: string;
}

export default () => {
	const colorScheme = useColorScheme();
	const route = useRoute<Route<'Session', { sessionId: string }>>();

	const [searchField, setSearchField] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [session, setSession] = useState<SessionProps | null>(null);
	const [candidates, setCandidates] = useState<CandidateModel[]>([]);
	const [selectedCandidate, setSelectedCandidate] = useState<CandidateModel>();

	useEffect(() => {
		setLoading(true);

		if (route.params) {
			const { sessionId } = route.params;
			loadSession(sessionId);
		}
	}, []);

	const loadSession = async (sessionId?: string) => {
		const { data: sessionsResponse } = await Api.getSessionById(sessionId);
		setSession(sessionsResponse.data);
		setLoading(false);
		loadCandidates(sessionId);
	};

	const loadCandidates = async (id?: string) => {
		setLoading(true);
		const { data: candidatesReponse } = await Api.getCandidatesBySessionId(id);
		const list: CandidateModel[] = [];

		for (let item of candidatesReponse.data) {
			const { data: userResponse } = await Api.getUserById(item.userId);
			const user = userResponse.data;
			list.push({
				...user,
				_id: item._id,
				id: item._id,
				userId: user.id,
				code: item.code,
			});
		}

		setCandidates(list);
		setLoading(false);
	};

	const handleOpenModalClick = (candidate: CandidateModel) => {
		setSelectedCandidate(candidate);
		setShowModal(true);
	};

	return loading ? (
		<Loading message='Buscando candidatos...' />
	) : (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Header title={session?.title || 'Sessão'} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<CenterArea>
					<DescriptionArea>
						<LogoIcon width={100} height={100} />
						<DescriptionColumn>
							<DescriptionText>{session?.description}</DescriptionText>
							<DescriptionText>
								Termina em{' '}
								{session?.expireAt?.toLocaleString().substring(0, 10)}
							</DescriptionText>
						</DescriptionColumn>
					</DescriptionArea>
					<Input
						value={searchField}
						onChangeText={setSearchField}
						placeholder='Buscar candidato'
						icon='search'
						autoCorrect={false}
					/>
				</CenterArea>
				<ListArea>
					{candidates.map((item, key) => (
						<CandidateCard key={key} onPress={() => handleOpenModalClick(item)}>
							{item?.avatar ? (
								<CandidateAvatar source={{ uri: item.avatar }} />
							) : (
								<UserAvatar width={90} height={90} />
							)}
							<CandidateName>{item.name}</CandidateName>
							<CandidateCode>{item.code}</CandidateCode>
						</CandidateCard>
					))}
				</ListArea>
			</ScrollView>
			<VoteConfirmModal
				show={showModal}
				setShow={setShowModal}
				candidate={selectedCandidate}
				sessionId={session?._id}
			/>
		</Container>
	);
};
