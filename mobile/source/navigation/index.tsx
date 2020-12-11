import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../@types/types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../screens/NotFoundScreen';
import Settings from '../screens/Settings';
import Session from '../screens/Session';
import Candidate from '../screens/Candidate';
import Sessions from '../screens/Sessions';
import Users from '../screens/Users';
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import TokenSignIn from '../screens/TokenSignIn';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName='Preload'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name='Root' component={BottomTabNavigator} />
			<Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
			<Stack.Screen name='Settings' component={Settings} />
			<Stack.Screen name='Session' component={Session} />
			<Stack.Screen name='Sessions' component={Sessions} />
			<Stack.Screen name='Candidate' component={Candidate} />
			<Stack.Screen name='Preload' component={Preload} />
			<Stack.Screen name='SignIn' component={SignIn} />
			<Stack.Screen name='SignUp' component={SignUp} />
			<Stack.Screen name='TokenSignIn' component={TokenSignIn} />
			<Stack.Screen name='Users' component={Users} />
		</Stack.Navigator>
	);
}
