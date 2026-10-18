import { Eye, EyeClosed } from 'lucide-react-native';
import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
export default function Login() {
    const PEYE_WH = 24;
    const PEYE_COLOR = 'gray';
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    const TogglePassword = () => setIsHidePassword(!isHidePassword);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className='flex-1 items-center justify-center bg-yellow-500'>
                <View className='flex-col w-full max-w-sm gap-y-8'>
                    <View className='flex-col w-full max-w-sm gap-y-2'>
                        <TextInput
                            className='w-full bg-white border border-gray-300 rounded-xl px-4 py-3 
                                text-gray-800 text-lg font-inter-regular font-light transition-colors 
                                duration-200 focus:border-blue-500'
                            placeholder='Enter username'
                            placeholderTextColor='#bababa'
                            value={username}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(t) => setUsername(t)}
                        />
                        <View className='relative flex items-end justify-center'>
                            <TextInput
                                className='w-full bg-white border border-gray-300 rounded-xl px-4 py-3 
                                    text-gray-800 text-lg font-inter-regular font-light transition-colors 
                                    duration-200 focus:border-blue-500'
                                placeholder='Enter password'
                                placeholderTextColor='#bababa'
                                value={password}
                                secureTextEntry={isHidePassword}
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={(t) => setPassword(t)}
                            />
                            { password.length > 0 &&
                                <Pressable className='absolute p-2' onPress={TogglePassword}>
                                    { isHidePassword
                                        ? <Eye width={PEYE_WH} height={PEYE_WH} color={PEYE_COLOR} />
                                        : <EyeClosed width={PEYE_WH} height={PEYE_WH} color={PEYE_COLOR} />
                                    }
                                </Pressable>
                            }
                        </View>
                    </View>
                    <View className='flex flex-row gap-x-8 justify-between items-between'>
                        <Pressable
                            className='p-4 w-[150px] rounded-2xl bg-white transition duration-[550ms] active:opacity-30'
                        >
                            <Text className='font-inter-regular text-black text-center'>Sign Up</Text>
                        </Pressable>
                        <Pressable
                            className='p-4 w-[150px] rounded-2xl bg-slate-900 transition duration-[550ms] active:opacity-30'
                        >
                            <Text className='font-inter-regular text-white text-center overflow-hidden'>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
