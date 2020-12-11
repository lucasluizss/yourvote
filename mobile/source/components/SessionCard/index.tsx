import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
	SessionButton,
	SessionButtonTitle,
	SessionButtonDescription,
	DateView,
	SessionArea,
	SessionDateDescription,
} from './styles';

interface SessionProps {
	title: string;
	description: string;
	startAt: Date;
	expireAt: Date;
	onPress: () => void;
}

export default ({
	title,
	description,
	startAt,
	expireAt,
	onPress,
}: SessionProps) => {
	return (
		<SessionButton onPress={onPress}>
			<SessionArea>
				<SessionButtonTitle>{title}</SessionButtonTitle>
				<SessionButtonDescription>{description}</SessionButtonDescription>

				<DateView>
					<Feather size={15} name='calendar' color='#f1f2ff' />
					<SessionDateDescription>
						{startAt.toLocaleString().substring(0, 10)}
					</SessionDateDescription>
				</DateView>

				<DateView>
					<Feather size={15} name='calendar' color='#f1f2ff' />
					<SessionDateDescription>
						{expireAt.toLocaleString().substring(0, 10)}
					</SessionDateDescription>
				</DateView>
			</SessionArea>
		</SessionButton>
	);
};
