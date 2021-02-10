import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { Text } from '../../components/Themed';

const { width, height } = Dimensions.get('window');

const Header = styled.View`
	margin-top: ${height * 0.01}px;
	padding: 0 15px;
	flex-direction: row;
	justify-content: center;
`;

const HeaderBackButton = styled.TouchableOpacity`
	margin-right: auto;
`;

type HeaderAreaProps = {
	addButtonVisible?: boolean;
};

const HeaderArea = styled.View<HeaderAreaProps>`
	flex: 1;
	margin-right: ${(props) => (props.addButtonVisible ? '0' : '30px')};
	justify-content: center;
	align-items: center;
`;

const HeaderTitle = styled(Text)`
	font-size: 25px;
	font-weight: bold;
`;

interface HeaderProps {
	title?: string;
	addButtonVisible?: boolean;
	actionAddButton?: () => void;
}

export default ({ title, addButtonVisible, actionAddButton }: HeaderProps) => {
	const { goBack, canGoBack } = useNavigation();

	return (
		<Header>
			{canGoBack() && (
				<HeaderBackButton onPress={goBack}>
					<Feather name='chevron-left' size={35} color='#536dfe' />
				</HeaderBackButton>
			)}
			<HeaderArea>
				<HeaderTitle>{title}</HeaderTitle>
			</HeaderArea>
			{addButtonVisible && (
				<HeaderBackButton onPress={actionAddButton}>
					<Feather name='plus-circle' size={35} color='#536dfe' />
				</HeaderBackButton>
			)}
		</Header>
	);
};
