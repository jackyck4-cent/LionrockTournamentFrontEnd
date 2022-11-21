export class TnInfo {
    tn_id!: string;
    owner!: string;         // owner's user id
    name!: string;
    description!: string;
    start_date!: string;
    end_date!: string;
    size!: number;          // 4, 8, 16
    status!: string;        // "draft", "enrolling", "started", "completed"
    current_round!: number; // 0=none, 1=final, 2=semi-final, 3=quarter-final, 4=round-of-16
    players!: string[];     // list of player's user id
}
