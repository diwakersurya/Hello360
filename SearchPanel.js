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
import axios from 'axios';
import { connect, set, setAll } from './Store';
import RotateView from './RotateView';

// class AdvertiserButton extends React.Component {
//     state = {
//         hover: false
//     };

//     render() {
//         return (
//             <VrButton
//                 style={styles.advertiserButton}
//                 onEnter={() => this.setState({ hover: true })}
//                 onExit={() => this.setState({ hover: false })}
//                 // onClick={() => setCurrent(this.props.index)}
//             >
//                 <Image
//                     style={styles.advertiserButtonPreview}
//                     source={{ uri: this.props.logoAssetUrl }}
//                 />
//                 <View
//                     style={[
//                         styles.advertiserButtonInfo,
//                         this.state.hover
//                             ? styles.advertiserButtonInfoHover
//                             : null
//                     ]}>
//                     <View style={styles.advertiserButtonLabel}>
//                         <Text style={styles.advertiserButtonName}>
//                             {this.props.name}
//                         </Text>
//                     </View>
//                     {/* <View style={styles.advertiserButtonLabel}>
//                         <Text style={styles.postButtonAuthor}>
//                             {this.props.author}
//                         </Text>
//                     </View> */}
//                 </View>
//             </VrButton>
//         );
//     }
// }

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
    }
    onClick() {
        // 4.) show the keyboard
        NativeModules.Keyboard.startInput({
            initialValue: this.props.userName,
            placeholder: 'Github UserName'
        }).then(input => set('userName', input));
    }
    fetchUserInfo() {
        this.props.fetchUserInfo();
    }

    render() {
        return (
            <View style={[styles.search]}>
                <VrButton
                    style={styles.userName}
                    onClick={this.onClick.bind(this)}>
                    <Text style={{ fontSize: 70 }}>
                        {this.props.userName || 'Github UserName'}
                    </Text>
                </VrButton>
                <VrButton
                    style={styles.btn}
                    onClick={this.fetchUserInfo.bind(this)}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={asset('search.png')}
                    />
                </VrButton>
            </View>
        );
    }
}

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }
    fetchUserInfo() {
        this.setState({ loading: true });
        if (this.props.userName !== '') {
            axios
                .get(`https://api.github.com/users/${this.props.userName}`)
                .then(resp => {
                    const {
                        avatar_url: imageUrl,
                        bio,
                        company,
                        location,
                        name,
                        followers,
                        following,
                        public_gists: publicGists,
                        public_repos: publicRepos
                    } = resp.data;
                    console.log(resp.data);
                    this.setState({ loading: false });
                    setAll({
                        imageUrl,
                        followers,
                        following,
                        publicGists,
                        publicRepos,
                        bio,
                        company,
                        location,
                        name
                    });
                });
        }
    }
    render() {
        const { loading } = this.state;
        return (
            <View style={styles.wrapper}>
                <Search
                    fetchUserInfo={this.fetchUserInfo.bind(this)}
                    {...this.props}
                />
                {loading && (
                    <RotateView rotate={'rotateY'} duration={500}>
                        <View style={styles.loader} />
                    </RotateView>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: 1000,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#303050',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        width: 800,
        height: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#303050',
        borderWidth: 2,
        flexDirection: 'row'
    },
    userName: {
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3
    },
    btn: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    loader: {
        position: 'absolute',
        top: 100,
        height: 50,
        width: 50,
        backgroundColor: 'yellow',
        borderWidth: 15,
        borderRadius: 25,
        borderColor: 'red'
    }
});

const ConnectedSearchPanel = connect(SearchInput);

export default ConnectedSearchPanel;
