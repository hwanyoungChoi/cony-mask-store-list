import Geolocation from '@react-native-community/geolocation';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { EmptyView } from './component/empty-view';
import { StoreCard } from './component/store-card';
import { getMaskStoreList, IMaskStoreList } from './lib/api';
import { useEffectAsync } from './lib/utils';

const DISTANCE = 5000; // 5Km

function App() {

    const [geoLocation, setGeoLocation] = useState({ lat: 0, lng: 0 });
    const [stores,setStores] = useState<IMaskStoreList>(null);

    const getGeolocation = () => {

        Geolocation.getCurrentPosition(info => {
            setGeoLocation({
                lat: info.coords.latitude,
                lng: info.coords.longitude,
            });
            // setGeoLocation({
            //     lat: 37.192747,
            //     lng: 127.205025,
            // });
        });

    }

    const getStores = async () => {

        getGeolocation();

        const result = await getMaskStoreList({
            lat: geoLocation.lat,
            lng: geoLocation.lng,
            m: DISTANCE,
        });
        setStores(result);

    }

    useEffectAsync(async () => await getStores(), []);

    function distance(coordinate1: any, coordinate2: any): number {
        const toRadian = (n: number) => (n * Math.PI) / 180;

        let lat2 = coordinate2.lat;
        let lng2 = coordinate2.lng;
        let lat1 = coordinate1.lat;
        let lng1 = coordinate1.lng;
        let R = 6371; // km
        let x1 = lat2 - lat1;
        let dLat = toRadian(x1);
        let x2 = lng2 - lng1;
        let dLng = toRadian(x2);
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d.toFixed(3);
      }

    function renderStoreListItem({ item }: any) {
        return <StoreCard
            style={ {
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 5,
                backgroundColor: 'white'
            } }
            name={ item.name }
            addr={ item.addr }
            remainStat={ item.remain_stat }
            distance={ distance(geoLocation, { lat: item.lat, lng: item.lng }) }
        />
    }

    return <SafeAreaView style={ { flex: 1 } }>
            <View style={ { backgroundColor: '#F1F1F1' } }>
                <View style={ {
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    backgroundColor: 'white',
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                } }>
                    <View>
                        <Text style={ {
                            fontSize: 26,
                            fontWeight: 'bold',
                            marginBottom: 5,
                        } }>
                            마스크 판매 정보
                        </Text>
                        <Text style={ { fontSize: 15 } }>
                            근처에 { stores?.count }개의 판매 장소가 있습니다.
                        </Text>
                    </View>
                    <View style={ {
                        justifyContent: 'center',
                    } }>
                        <TouchableOpacity onPress={ async () => await getStores() }>
                            <Image
                                style={ { width: 25, height: 25 } }
                                source={ require('./assets/refresh.png') }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                { stores?.count > 0 ?
                    <FlatList
                        data={ stores.stores }
                        renderItem={ renderStoreListItem }
                        keyExtractor={ (store) => store.code }
                    /> : <EmptyView text="반경 5Km 내에 마스크 판매점이 없어요!" />
                }
            </View>
    </SafeAreaView>

}

export default App;
