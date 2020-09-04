import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

const reactotron = Reactotron.configure({
    name: 'React Native Demo'
})
    .use(reactotronRedux())
    .useReactNative({
        asyncStorage: AsyncStorage, // there are more options to the async storage.
        networking: {
            // optionally, you can turn it off with false.
            ignoreUrls: /symbolicate/
        },
        editor: false, // there are more options to editor
        // errors: {veto: stackFrame => false}, // or turn it off with false
        overlay: false // just turning off overlay
    })
    .connect();

export default reactotron;
