export interface IMaskStoreList {
    count:  number;
    stores: IMaskStore[];
}

export interface IMaskStore {
    addr:           string;
    code:           string;
    created_at:     string;
    lat:            number;
    lng:            number;
    name:           string;
    remain_stat:    string;
    stock_at:       string;
    type:           string;
}

export interface IGetMaskStoreListParams {
    lat: number;
    lng: number;
    m:   number;
}

export enum RemainStat {
    Plenty = 'plenty',   // 100개 이상, 녹색
    Some =   'some',     // 30개 이상, 노랑색
    Few =    'few',      // 2개 이상, 빨강색
    Empty =  'empty',    // 1개 이상, 회색
}

export enum StoreType {
    Pharmacy =   '01', // 약국
    Post =       '02', // 우체국
    NH =         '03', // 농협 하나로마트
}

export async function getMaskStoreList({ lat, lng, m }: IGetMaskStoreListParams): Promise<IMaskStoreList> {

        try {

            const url = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json';
            const response = await fetch(`${url}?lat=${lat}&lng=${lng}&m=${m}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200)
                return await response.json();

        } catch (error) {

            console.log(error);

        }

}