import * as Notifications from 'expo-notifications';

export async function getPushNotficationToken() {
    const { granted } = await Notifications.getPermissionsAsync();

    if (!granted) {
        await Notifications.requestPermissionsAsync();
    }

    if (granted) {
        const pushToken = await Notifications.getExpoPushTokenAsync();
        console.log(" NOTFICATION TOKEN =>", pushToken.data);

        return pushToken.data
    }
}