export class TnInfo {
    tn_id!: string;
    name!: string;
    description!: string;
    owner!: string;         // owner's user id
    size!: number;          // 4, 8, 16
    start_date!: string;
    end_date!: string;
    status!: string;        // "draft", "enrolling", "started", "completed"
    players!: string[];     // list of player's user id
    current_round!: string; // current round: ''=dontcare, '_2'=final, '_4'=semi-final, '_8'=quarter-final, '_16'=round-of-16
    champion!: string;
    bouts!: {[key: string]: string[][]};
        // {
        //   '_2': [
        //     // 1st-player, 2nd-player, winner
        //     ['', '', ''],
        //   ],
        //   '_4': [
        //     // 1st-player, 2nd-player, winner
        //     ['', '', ''],
        //     // 3rd-player, 4th-player, winner
        //     ['', '', ''],
        //   ],
        //   '_8': [
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //   ],
        //   '_16': [
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //     ['', '', ''],
        //   ],
        // }
}
