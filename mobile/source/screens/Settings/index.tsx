import { useNavigation } from '@react-navigation/core';
import React from 'react';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Container, Title } from './styles';

export default () => {
	const colorScheme = useColorScheme();
	const navigation = useNavigation();

	return (
		<Container backgroundColor={Colors[colorScheme].background}>
			<Header title='Configurações' addButtonVisible />
		</Container>
	);
};
