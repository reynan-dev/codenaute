import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

export async function registerForPushNotificationsAsync() {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C'
		});
	}

	return token;
}

export const usePushNotifications = () => {
	const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
	const [notification, setNotification] = useState<Notifications.Notification | null>(null);
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification); // Déclenché lorsque l'application est active à la réception de la notification
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			setNotification(response.notification); // Déclenché lorsque l'utilisateur clique sur la notification (quand l'application était inactive)
		});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return { notification };
};

export const useActionUponNotification = (
	notification: Notifications.Notification,
	actionName: string,
	callback: () => any
) => {
	useEffect(() => {
		if (notification?.request.content.data.action === actionName) {
			callback();
		}
	}, [notification]);
};
