import * as React from 'react';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
    userName: ''
};

const listeners = new Set();

function updateComponents() {
    for (const cb of listeners.values()) {
        cb();
    }
}

export function initialize(apiKey) {
    updateComponents();
}

export function set(field, value) {
    State[field] = value;
    updateComponents();
}
export function setAll(obj) {
    Object.keys(obj).forEach(prop => {
        State[prop] = obj[prop];
    });
    updateComponents();
}

export function connect(Component) {
    return class Wrapper extends React.Component {
        state = {
            ...State
        };

        _listener = () => {
            this.setState({
                ...State
            });
        };

        componentDidMount() {
            listeners.add(this._listener);
        }

        componentWillUnmount() {
            listeners.delete(this._listener);
        }

        render() {
            return <Component {...this.props} {...this.state} />;
        }
    };
}
