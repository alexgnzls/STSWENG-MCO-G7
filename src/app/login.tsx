import { Eye, EyeClosed } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
export default function Login() {
    /* Value constants */
    const KASV_BTMOFFSET = 100;
    const PEYE_COLOR = 'rgb(234,179,8)';
    const PEYE_WH = 24;
    const FLD_STYLE = 'w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 ' +
        'text-gray-800 text-lg font-inter-regular font-light transition duration-800 ' +
        'focus:border-4 focus:border-yellow-400';
    const FLD_PHCOLOR = '#bababa';
    /* States and functions */
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    const TogglePassword = () => setIsHidePassword(!isHidePassword);
    return (
        <KeyboardAwareScrollView
            bottomOffset={KASV_BTMOFFSET}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}
            className='p-4 flex-1 bg-yellow-500'
        >
            <Image
                className='scale-[0.80]'
                source={require('../../assets/images/pageicon.png')}
            />
            <View className='flex-col w-full max-w-sm gap-y-8 items-center'>
                <View className='flex-col w-full max-w-sm gap-y-2'>
                    <TextInput
                        className={FLD_STYLE}
                        placeholder='Enter username'
                        placeholderTextColor={FLD_PHCOLOR}
                        value={username}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(t) => setUsername(t)}
                    />
                    <View className='relative flex items-end justify-center'>
                        <TextInput
                            className={FLD_STYLE}
                            placeholder='Enter password'
                            placeholderTextColor={FLD_PHCOLOR}
                            value={password}
                            secureTextEntry={isHidePassword}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(t) => setPassword(t)}
                        />
                        { password.length > 0 &&
                            <Pressable className='absolute p-[0.75em]' onPress={TogglePassword}>
                                { isHidePassword
                                    ? <Eye width={PEYE_WH} height={PEYE_WH} color={PEYE_COLOR} />
                                    : <EyeClosed width={PEYE_WH} height={PEYE_WH} color={PEYE_COLOR} />
                                }
                            </Pressable>
                        }
                    </View>
                </View>
                <View className='flex flex-row gap-x-8 justify-between items-between'>
                    <Pressable className='p-4 w-[150px] rounded-2xl bg-white transition duration-[550ms] active:opacity-30'>
                        <Text className='font-inter-regular text-black text-center'>Sign Up</Text>
                    </Pressable>
                    <Pressable className='p-4 w-[150px] rounded-2xl bg-slate-900 transition duration-[550ms] active:opacity-30'>
                        <Text className='font-inter-regular text-white text-center overflow-hidden'>Login</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
