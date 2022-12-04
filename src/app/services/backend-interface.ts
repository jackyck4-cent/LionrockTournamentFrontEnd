import { PlayerInfo } from "../shared/player_info";
import { TnInfo } from "../shared/tn_info";

export interface BackendInterface {
    getMyUserId(): string;
    getMyUserName(): string;
    getTnList(filters: string[]): [Map<string, PlayerInfo>, Map<string, TnInfo>];
    getTn(id: string): [Map<string, PlayerInfo>, TnInfo];
    registerTn(tn_id: string, user_id: string): boolean;
    createTn(tn_info: TnInfo): string;
    updateTn(tn_info: TnInfo): boolean;
    deleteTn(tn_id: string): boolean;
}
