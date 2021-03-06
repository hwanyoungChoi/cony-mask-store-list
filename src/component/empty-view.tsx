import React from 'react';
import { Text, View } from 'react-native';

export const EmptyView = React.memo(({ text }: { text: string }) => {

    return <View style={ {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    } }>
        <Text>{ text }</Text>
    </View>

});