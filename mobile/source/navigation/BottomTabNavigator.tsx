import * as React from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Api } from '../services/api.service';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DashboardScreen from '../screens/Dashboard';
import ProfileScreen from '../screens/Profile';
import {
	BottomTabParamList,
	DashboardParamList,
	ProfileParamList,
} from '../@types/types';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	const { reset } = useNavigation();

	Api.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			if (error.response.status === 401) {
				Alert.alert('Token Inválido');
				reset({ routes: [{ name: 'SignIn' }] });
			}
		}
	);

	return (
		<BottomTab.Navigator
			initialRouteName='Dashboard'
			tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
		>
			<BottomTab.Screen
				name='Dashboard'
				component={DashboardNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
				}}
			/>
			<BottomTab.Screen
				name='Perfil'
				component={ProfileNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props: { name: string; color: string }) {
	return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardNavigator() {
	return (
		<DashboardStack.Navigator>
			<DashboardStack.Screen
				name='DashboardScreen'
				component={DashboardScreen}
				options={{ headerShown: false }}
			/>
		</DashboardStack.Navigator>
	);
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
	return (
		<ProfileStack.Navigator>
			<ProfileStack.Screen
				name='ProfileScreen'
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
		</ProfileStack.Navigator>
	);
}
