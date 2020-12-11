import React from 'react';
import styled from 'styled-components/native';

const LoadingArea = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Loading = styled.ActivityIndicator.attrs({
	size: 'large',
	color: '#536dfe',
})`
	margin-bottom: 10px;
`;

const Message = styled.Text`
	font-size: 30px;
	color: #536dfe;
`;

interface LoadingProps {
	message?: string;
}

export default ({ message }: LoadingProps) => (
	<LoadingArea>
		<Loading />
		<Message>{message || 'Carregando...'}</Message>
	</LoadingArea>
);
