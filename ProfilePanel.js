import * as React from 'react';
import {
    Image,
    NativeModules,
    StyleSheet,
    Text,
    View,
    VrButton,
    asset
} from 'react-360';
import { connect, set } from './Store';
function IconText(props) {
    const { imageName, children } = props;
    return (
        <View style={[styles.iconText, props.style]}>
            <Image
                style={{ width: 30, height: 30, marginRight: 5 }}
                source={asset(imageName)}
            />
            <Text>{children}</Text>
        </View>
    );
}
const Profile = props => {
    console.log('>>>>>', props);
    return (
        <View style={styles.wrapper}>
            {props.imageUrl && (
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: props.imageUrl }}
                    />
                    <Text style={styles.name}>{props.name}</Text>
                    <Text>{props.bio}</Text>
                    <IconText imageName="company.png">{props.company}</IconText>
                    <IconText imageName="location.png">
                        {props.location}
                    </IconText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: 400,
        height: 600,
        flexDirection: 'column'
    },
    profileContainer: {
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        padding: 10
    },
    profileImage: {
        width: 380,
        height: 400,
        backgroundColor: 'rgba(255, 255, 255,1)'
    },
    name: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
});

const ConnectedProfilePanel = connect(Profile);

export default ConnectedProfilePanel;
