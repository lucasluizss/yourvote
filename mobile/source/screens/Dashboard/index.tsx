import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

import * as Api from '../../services/api.service';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import useColorScheme from '../../hooks/useColorScheme';
import SessionCard from '../../components/SessionCard';
import LogoIcon from '../../assets/icons/undraw_ideas_flow_cy7b.svg';
import { Container, CenterArea, TitleArea, Title, ListArea } from './styles';
import SessionModel from '../../models/SessionModel';

export default () => {
	const colorScheme = useColorScheme();
	const { navigate } = useNavigation();

	const [currentSessions, setCurrentSessions] = useState<SessionModel[]>([]);
	const [currentSessionTemp, setCurrentSessionTemp] = useState<SessionModel[]>([]);
	const [futureSessions, setFutureSessions] = useState<SessionModel[]>([]);
	const [futureSessionsTemp, setFutureSessionsTemp] = useState<SessionModel[]>([]);
	const [pastSessions, setPastSessions] = useState<SessionModel[]>([]);
	const [pastSessionsTemp, setPastSessionsTemp] = useState<SessionModel[]>([]);
	const [searchField, setSearchField] = useState<string>('');

	useEffect(() => {
		const loadSessions = async () => {
			const { data } = await Api.getCurrentSessions();
			setCurrentSessionTemp(data.data);
			setCurrentSessions(data.data);
		};

		loadSessions();
	}, []);

	useEffect(() => {
		const loadSessions = async () => {
			const { data } = await Api.getPastSessions();
			setPastSessionsTemp(data.data);
			setPastSessions(data.data);
		};

		loadSessions();
	}, []);

	useEffect(() => {
		const loadSessions = async () => {
			const { data } = await Api.getFutureSessions();
			setFutureSessionsTemp(data.data);
			setFutureSessions(data.data);
		};

		loadSessions();
	}, []);

	const filterSessions = (text: string) => {
		setSearchField(text);

		const currentSessionFiltered = currentSessions.filter(item => {
			const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
			return itemData.indexOf(searchField.toUpperCase()) > -1;
		});

		const pastSessionFiltered = pastSessions.filter(item => {
			const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
			return itemData.indexOf(searchField.toUpperCase()) > -1;
		});

		const futureSessionFiltered = futureSessions.filter(item => {
			const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
			return itemData.indexOf(searchField.toUpperCase()) > -1;
		});

		setCurrentSessionTemp(currentSessionFiltered);
		setPastSessionsTemp(pastSessionFiltered);
		setFutureSessionsTemp(futureSessionFiltered);
	};

	return (
		<Container backgroundColor={Colors[colorScheme].background}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CenterArea>
					<LogoIcon width={200} height={200} />
					<Input
						value={searchField}
						onChangeText={text => filterSessions(text)}
						placeholder='Buscar sessão'
						icon='search'
						autoCorrect={false}
					/>
				</CenterArea>
				<ListArea>
					<TitleArea>
						<Feather size={25} name='book-open' color='#536DFE' />
						<Title>Sessões em andamento</Title>
						<Feather
							size={25}
							name='list'
							color='#536DFE'
							style={{ marginLeft: 'auto' }}
						/>
					</TitleArea>

					<ScrollView showsHorizontalScrollIndicator={false} horizontal>
						{currentSessionTemp.map(
							({ _id, title, description, startAt, expireAt }, key) => (
								<SessionCard
									key={key}
									onPress={() => navigate('Session', { sessionId: _id })}
									title={title}
									description={description}
									startAt={startAt}
									expireAt={expireAt}
								/>
							)
						)}
					</ScrollView>
				</ListArea>

				<ListArea>
					<TitleArea>
						<Feather size={25} name='book' color='#536DFE' />
						<Title>Sessões expiradas</Title>
						<Feather
							size={25}
							name='list'
							color='#536DFE'
							style={{ marginLeft: 'auto' }}
						/>
					</TitleArea>

					<ScrollView showsHorizontalScrollIndicator={false} horizontal>
						{pastSessionsTemp.map(
							({ _id, title, description, startAt, expireAt }, key) => (
								<SessionCard
									key={key}
									onPress={() => Alert.alert('Esta sessão expirou')}
									title={title}
									description={description}
									startAt={startAt}
									expireAt={expireAt}
								/>
							)
						)}
					</ScrollView>
				</ListArea>

				<ListArea>
					<TitleArea>
						<Feather size={25} name='book' color='#536DFE' />
						<Title>Sessões futuras</Title>
						<Feather
							size={25}
							name='list'
							color='#536DFE'
							style={{ marginLeft: 'auto' }}
						/>
					</TitleArea>

					<ScrollView showsHorizontalScrollIndicator={false} horizontal>
						{futureSessionsTemp.map(
							({ _id, title, description, startAt, expireAt }, key) => (
								<SessionCard
									key={key}
									onPress={() => Alert.alert('Sessão ainda não foi iniciada')}
									title={title}
									description={description}
									startAt={startAt}
									expireAt={expireAt}
								/>
							)
						)}
					</ScrollView>
				</ListArea>
			</ScrollView>
		</Container>
	);
};
