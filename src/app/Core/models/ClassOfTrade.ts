export interface ClassOfTrade {
    tradeCode: string;
    tradeDesc: string;
    isActive: boolean;
}

export interface ClassOfTradeData {
    totalRecords: number;
    classOfTradeDtoinfo: ClassOfTrade[];
}

export interface ClassOfTradeListResponse {
    success: boolean;
    status: number;
    message: string;
    data: ClassOfTradeData;
}

export interface ClassOfTradeResponse {
    success: boolean;
    status: number;
    message: string;
    data: ClassOfTrade;
}
