/*This is an Example of React Native Rotate Image View Using Animation*/
import React from 'react';
//import react in our project
import { Animated } from 'react-360';
//import all the components we needed
export default class Rotate extends React.Component {
    constructor(props) {
        super(props);
        this.RotateValueHolder = new Animated.Value(0);
    }
    componentDidMount() {
        this.StartImageRotateFunction();
    }
    StartImageRotateFunction() {
        this.RotateValueHolder.setValue(0);
        Animated.timing(this.RotateValueHolder, {
            toValue: 1,
            duration: this.props.duration || 3000
        }).start(() => this.StartImageRotateFunction());
    }
    render() {
        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Animated.View
                style={{
                    transform: [
                        { [this.props.rotate || 'rotateY']: RotateData }
                    ]
                }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
