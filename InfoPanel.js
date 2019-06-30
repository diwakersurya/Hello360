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
import Rotate from './RotateView';
function Count(props) {
    const { children } = props;
    return (
        <View style={[styles.count, props.style]}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                {props.title}
            </Text>
            <Text style={{ fontSize: 70, fontWeight: 'bold' }}>{children}</Text>
        </View>
    );
}
const Info = props => {
    console.log('>>>>>++++', props);
    return (
        <View style={styles.wrapper}>
            {props.imageUrl && (
                <View style={styles.infoContainer}>
                    <Rotate>
                        <Count title={'followers'}>{props.followers}</Count>
                    </Rotate>
                    <Rotate>
                        <Count title={'following'}>{props.following}</Count>
                    </Rotate>
                    <Rotate>
                        <Count title={'gists'}>{props.publicGists}</Count>
                    </Rotate>
                    <Rotate>
                        <Count title={'repos'}>{props.publicRepos}</Count>
                    </Rotate>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: 1200,
        height: 600,
        flexDirection: 'column',
        padding: 10
    },
    infoContainer: {
        height: 600,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    count: {
        width: 250,
        height: 250,
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 0, 0,0.8)',
        borderRadius: 125,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 10,
        borderColor: 'yellow'
    }
});

const ConnectedInfoPanel = connect(Info);

export default ConnectedInfoPanel;
