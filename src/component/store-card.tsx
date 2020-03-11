import React from 'react';
import { Text, TextStyle, View } from 'react-native';

import { RemainStat } from '../lib/api';

export const StoreCard = React.memo(({
    name,
    addr,
    remainStat,
    distance,
    style,
}: {
    name: string,
    addr: string,
    remainStat: RemainStat,
    distance: number,
    style?: TextStyle,
}) => {

    const toRemainStatString = () => {

        switch (remainStat) {
            case RemainStat.Plenty:
                return '100개~';
            case RemainStat.Some:
                return '30개 ~ 100개';
            case RemainStat.Few:
                return '~30개';
            case RemainStat.Empty:
                return '없음';
        }

    }

    const toRemainStatColor = () => {

        switch (remainStat) {
            case RemainStat.Plenty:
                return '#3FED65';
            case RemainStat.Some:
                return '#F8F16D';
            case RemainStat.Few:
                return '#F86D6D';
            case RemainStat.Empty:
                return '#C1C1C1';
        }

    }

    return <View style={ {
        ...style,
    } }>
        <View style={ {
            position: 'absolute',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            left: 0,
            width: 12,
            height: '100%',
            backgroundColor: toRemainStatColor(),
        } } />
        <View style={ {
            paddingLeft: 25,
            paddingRight: 20,
            paddingVertical: 15,
        } }>
            <Text style={ {
                fontSize: 18,
                fontWeight: 'bold',
            } }>
                { name }
            </Text>
            <Text style={ {
                position: 'absolute',
                right: 0,
                paddingTop: 5,
                paddingRight: 5,
                fontSize: 12,
            } }>
                { distance }km
            </Text>
            <Text style={ { marginVertical: 3 } }>{ addr }</Text>
            <Text>보유수량: { toRemainStatString() }</Text>
        </View>
    </View>;

});