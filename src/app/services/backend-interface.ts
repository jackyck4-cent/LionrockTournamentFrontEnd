import { PlayerInfo } from "../shared/player_info";
import { TnInfo } from "../shared/tn_info";

export interface BackendInterface {
    getTnList(): [Map<string, PlayerInfo>, Map<string, TnInfo>];
    getTn(id: string): [Map<string, PlayerInfo>, TnInfo];
    createTn(tn_info: TnInfo): string;
    updateTn(tn_info: TnInfo): void;
    deleteTn(tn_id: string): void;
}
