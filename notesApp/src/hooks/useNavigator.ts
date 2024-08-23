import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {StackRoutesList} from '@navigation';

const useNavigator = useNavigation<NativeStackNavigationProp<StackRoutesList>>;

export default useNavigator;
