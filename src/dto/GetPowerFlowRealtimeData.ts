interface Inverters {
    1: {
        DT: number;
        E_Day: number;
        E_Total: number;
        E_Year: number;
        P: number;
    }
};

interface Site {
    E_Day: number;
    E_Total: number;
    E_Year: number;
    Meter_Location: string;
    Mode: string;
    P_Akku?: any;
    P_Grid: number;
    P_Load: number;
    P_PV: number;
    rel_Autonomy: number;
    rel_SelfConsumption: number;
};

interface Data {
    Inverters: Inverters;
    Site: Site;
    Version: string;
};

interface Body {
    Data: Data;
};

interface RequestArguments {
};

interface Status {
    Code: number;
    Reason: string;
    UserMessage: string;
};

interface Head {
    RequestArguments: RequestArguments;
    Status: Status;
    Timestamp: Date;
};

export interface GetPowerFlowRealtimeData {
    Body: Body;
    Head: Head;
};
