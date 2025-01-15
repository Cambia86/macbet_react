import { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"
import { TailSpin } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import Col from 'react-bootstrap/Col';

export default function CreaPrevisione(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currPrevisions, setCurrPrevisions] = useState(null);
    const [historyResult, setHistoryResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const formatDate = (date) => {
        const newDate = new Date(date)
        newDate.setHours(12, 0, 0, 0)
        return date ? newDate.toISOString().split('T')[0] : null;
    };

    const addprevisiontoitem = (item, type, quotaperc) => {
        if (item.prev1 == null) {
            item.prev1 = type;
            item.prev1quotaPerc = quotaperc;
        } else {
            if (item.prev2 == null) {
                item.prev2 = type;
                item.prev2quotaPerc = quotaperc;
            } else {
                if (item.prev3 == null) {
                    item.prev3 = type;
                    item.prev3quotaPerc = quotaperc;
                } else {
                    if (item.prev4 == null) {
                        item.prev4 = type;
                        item.prev4quotaPerc = quotaperc;
                    } else {
                        if (item.prev5 == null) {
                            item.prev5 = type;
                            item.prev5quotaPerc = quotaperc;
                        } else {
                            if (item.prev6 == null) {
                                item.prev6 = type;
                                item.prev6quotaPerc = quotaperc;
                            }
                        }
                    }
                }
            }
        }
    }

    const getPercentageSuccessBychampionshipandprevision = (prev, leagueName, hist) => {
        let itm = { key: "", success: 0, error: 0 };
        if (prev == "multi13casa") {
            let lststat = hist.multi13casastats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "multi13ospite") {
            let lststat = hist.multi13ospitestats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "multi24casa") {
            let lststat = hist.multi24casastats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "OVER 1,5") {
            let lststat = hist.over15stats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "OVER 2,5") {
            let lststat = hist.over25stats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "UNDER 2,5") {
            let lststat = hist.under25stats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "UNDER 3,5") {
            let lststat = hist.under35stats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "GOALCUSTOM") {
            let lststat = hist.goalstats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "MULTIGOL 2-4") {
            let lststat = hist.multigoal24stats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "MULTIGOL 2-3") {
            let lststat = hist.multigoal23stats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "HOME W UN T.") {
            let lststat = hist.homewinleatonehalfstats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "FUORI VINCE UN TEMPO") {
            let lststat = hist.fuoriwinleatonehalfstats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "1") {
            let lststat = hist.winhomestats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "Ov 0,5H Un 2,5A") {
            let lststat = hist.over05homeunder25awaystats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        if (prev == "Un 2,5H Ov 2,5A") {
            let lststat = hist.under25homeover05awaystats;
            let items = lststat != undefined ? lststat.filter((element) => element.key == leagueName) : [];
            if (items.length > 0) {
                itm = items[0];
                itm.percentage = calculatepercentage(itm);
            }
        }
        return itm;

    }

    const calculatepercentage = (itm) => {
        let suc = itm.success;
        let err = itm.error;
        let tot = suc + err;
        let perc = (suc / tot) * 100;
        return perc;
    }

    const getAllChamp = () => {
        const formattedDate = formatDate(selectedDate);

        let sa = null;
        let pl = null;
        let liga = null;
        let lig1 = null;
        let bunde = null;
        let hist = null;
        setLoading(true)
        FixtureAPI.getHistoryResult().then((histJson) => {
            setHistoryResult(histJson);
            hist = histJson;
            FixtureAPI.getPicchetto(135, formattedDate).then((data) => {
                sa = data;
                FixtureAPI.getPicchetto(39, formattedDate).then((data2) => {
                    pl = data2;
                    FixtureAPI.getPicchetto(140, formattedDate).then((data3) => {
                        liga = data3;
                        FixtureAPI.getPicchetto(78, formattedDate).then((data4) => {
                            bunde = data4;
                            FixtureAPI.getPicchetto(61, formattedDate).then((data5) => {
                                setLoading(false)
                                lig1 = data5;
                                let merged = [...sa.resprevisionoftheday, ...pl.resprevisionoftheday, ...lig1.resprevisionoftheday, ...liga.resprevisionoftheday, ...bunde.resprevisionoftheday]
                                let mergedwithprev = merged.map(item => {
                                    //Multigol24 
                                    if (item.prevision.multi2_4.quotaPerc >= 76) {
                                        addprevisiontoitem(
                                            item, "MULTIGOL 2-4", item.prevision.multi2_4.quotaPerc);
                                    }
                                    //GetGoalInDate
                                    if (item.prevision.goal.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "GOAL", item.prevision.goal.quotaPerc);
                                    }

                                    //GetGoalCustomInDate
                                    if (item.prevision.multi_casa_14.quotaPerc >= 70 &&
                                        item.prevision.multi_trasf_14.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "GOALCUSTOM", item.prevision.goal.quotaPerc)
                                    }

                                    // GetWinhomeInDate
                                    if (item.prevision.winHome.quotaPerc >= 75 ||
                                        (item.prevision.winAway.quotaPerc <= 25 &&
                                            item.prevision.draw.quotaPerc <= 25)) {
                                        addprevisiontoitem(item, "1", item.prevision.winHome.quotaPerc);
                                    }

                                    // GetUMulti13CasaInDate
                                    if (item.prevision.multi_casa_13.quotaPerc >= 78) {
                                        addprevisiontoitem(
                                            item, "multi13casa", item.prevision.multi_casa_13.quotaPerc);
                                    }

                                    // GetUMulti13OspiteInDate
                                    if (item.prevision.multi_trasf_13.quotaPerc >= 78) {
                                        addprevisiontoitem(item, "multi13ospite", item.prevision.multi_trasf_13.quotaPerc);
                                    }

                                    // GetUMulti24CasaInDate
                                    if (item.prevision.multi_casa_24.quotaPerc >= 65) {
                                        addprevisiontoitem(item, "multi24casa", item.prevision.multi_casa_13.quotaPerc);
                                    }

                                    // GetOver15InDate
                                    if (item.prevision.over_15.quotaPerc > 75) {
                                        addprevisiontoitem(item, "OVER 1,5", item.prevision.over_15.quotaPerc);
                                    }

                                    // GetOver25InDate
                                    if (item.prevision.over_25.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "OVER 2,5", item.prevision.over_25.quotaPerc);
                                    }

                                    // GetUnder35InDate
                                    if (item.prevision.under_35.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "UNDER 3,5", item.prevision.under_35.quotaPerc);
                                    }

                                    // homeWin1halfInDate
                                    if (item.prevision.casaVinceAlmenounTempo.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "HOME W UN T.", item.prevision.casaVinceAlmenounTempo.quotaPerc);
                                    }

                                    // awayWin1halfInDate
                                    if (item.prevision.fuoriVinceAlmenounTempo.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "FUORI VINCE UN TEMPO", item.prevision.fuoriVinceAlmenounTempo.quotaPerc);
                                    }

                                    // multi23risk
                                    if (item.prevision.over_15.quotaPerc >= 75 &&
                                        item.prevision.under_35.quotaPerc > 75) {
                                        addprevisiontoitem(item, "MULTIGOL 2-3", 75);
                                    }

                                    // under2emezzorisk
                                    if (item.prevision.under_25.quotaPerc >= 75) {
                                        addprevisiontoitem(
                                            item, "UNDER 2,5", item.prevision.under_25.quotaPerc);
                                    }

                                    // drawnobetand1
                                    if (item.prevision.multi_casa_14.quotaPerc >= 78 &&
                                        item.prevision.winHome.quotaPerc > 60) {
                                        addprevisiontoitem(item, "1 DRAW NO BET", 0);
                                    }

                                    // over05homeunder25away
                                    if (item.prevision.ov05CasaANDun25Fuori.quotaPerc >= 75) {
                                        addprevisiontoitem(item, "Ov 0,5H Un 2,5A",
                                            item.prevision.ov05CasaANDun25Fuori.quotaPerc);
                                    }

                                    // win home corner
                                    if (item.prevision.winHomeCorner.quotaPerc >= 70) {
                                        addprevisiontoitem(item, "WIN_HOME_CORNER",
                                            item.prevision.winHomeCorner.quotaPerc);
                                    }

                                    // win away corner
                                    if (item.prevision.winAwayCorner.quotaPerc >= 70) {
                                        addprevisiontoitem(item, "WIN_AWAY_CORNER",
                                            item.prevision.winAwayCorner.quotaPerc);
                                    }

                                     // win home falli
                                     if (item.prevision.winHomeFalli.quotaPerc >= 70) {
                                        addprevisiontoitem(item, "WIN_HOME_FALLI",
                                            item.prevision.winHomeCorner.quotaPerc);
                                    }

                                    // win away falli
                                    if (item.prevision.winAwayFalli.quotaPerc >= 70) {
                                        addprevisiontoitem(item, "WIN_AWAY_FALLI",
                                            item.prevision.winAwayCorner.quotaPerc);
                                    }

                                     // win home Tiri porta
                                     if (item.prevision.winHomeTiriPorta.quotaPerc > (item.prevision.winAwayTiriPorta.quotaPerc*2)) {
                                        addprevisiontoitem(item, "WIN_HOME_TIRI_PORTA",
                                            item.prevision.winHomeTiriPorta.quotaPerc);
                                    }

                                     // win away Tiri porta
                                     if ((item.prevision.winHomeTiriPorta.quotaPerc*2) < (item.prevision.winAwayTiriPorta.quotaPerc)) {
                                        addprevisiontoitem(item, "WIN_AWAY_TIRI_PORTA",
                                            item.prevision.winAwayTiriPorta.quotaPerc);
                                    }

                                     // win home Tiri totali
                                     if (item.prevision.winHomeTiriTotali.quotaPerc > (item.prevision.winAwayTiriTotali.quotaPerc*2)) {
                                        addprevisiontoitem(item, "WIN_HOME_TIRI_TOTALI",
                                            item.prevision.winHomeTiriTotali.quotaPerc);
                                    }

                                     // win away Tiri totali
                                     if ((item.prevision.winHomeTiriTotali.quotaPerc*2) < (item.prevision.winAwayTiriTotali.quotaPerc)) {
                                        addprevisiontoitem(item, "WIN_AWAY_TIRI_TOTALI",
                                            item.prevision.winAwayTiriTotali.quotaPerc);
                                    }
                                    // AddHistoryPrevision
                                    return item
                                })

                                let mergedpreperc = mergedwithprev.map(value => {
                                    let prev = value;
                                    let hometeamid = value.fixture.teams.home.id;
                                    let awayteamid = value.fixture.teams.away.id;
                                    if (prev.prev1 != null) {
                                        let res = getPercentageSuccessBychampionshipandprevision(
                                            prev.prev1, prev.fixture.league.name, hist.result);
                                        prev.prev1historyprob = res.percentage != undefined ? res.percentage : 0;
                                        prev.success1Home =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.success1Away =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail1Home =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail1Away =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                    }
                                    if (prev.prev2 != null) {
                                        let res = getPercentageSuccessBychampionshipandprevision(
                                            prev.prev2, prev.fixture.league.name, hist.result);
                                        prev.prev2historyprob = res.percentage != undefined ? res.percentage : 0;
                                        prev.success2Home =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.success2Away =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail2Home =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail2Away =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                    }
                                    if (prev.prev3 != null) {
                                        let res = getPercentageSuccessBychampionshipandprevision(
                                            prev.prev3, prev.fixture.league.name, hist.result);
                                        prev.prev3historyprob = res.percentage != undefined ? res.percentage : 0;
                                        prev.success3Home =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.success3Away =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail3Home =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail3Away =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                    }
                                    if (prev.prev4 != null) {
                                        let res = getPercentageSuccessBychampionshipandprevision(
                                            prev.prev4, prev.fixture.league.name, hist.result);
                                        prev.prev4historyprob = res.percentage != undefined ? res.percentage : 0;
                                        prev.success4Home =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.success4Away =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail4Home =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail4Away =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                    }
                                    if (prev.prev5 != null) {
                                        let res = getPercentageSuccessBychampionshipandprevision(
                                            prev.prev5, prev.fixture.league.name, hist.result);
                                        prev.prev5historyprob = res.percentage != undefined ? res.percentage : 0;
                                        prev.success5Home =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.success5Away =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail5Home =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail5Away =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                    }

                                    if (prev.prev6 != null) {
                                        let res = getPercentageSuccessBychampionshipandprevision(
                                            prev.prev6, prev.fixture.league.name, hist.result);
                                        prev.prev5historyprob = res.percentage != undefined ? res.percentage : 0;
                                        prev.success6Home =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.success6Away =
                                            (res.successTeams != null && res.successTeams.length > 0)
                                                ? res.successTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail6Home =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == hometeamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                        prev.fail6Away =
                                            (res.failureTeams != null && res.failureTeams.length > 0)
                                                ? res.failureTeams
                                                    .map((element) => element.id == awayteamid ? 1 : 0)
                                                    .reduce((value, element) => value + element)
                                                : 0;
                                    }

                                    let retobj = {
                                        "match": prev.fixture,
                                        "previsionjson": prev.prevision,
                                        "prev1": prev.prev1,
                                        "prev1quotaPerc": prev.prev1quotaPerc,
                                        "prev1historyprob": prev.prev1historyprob,
                                        "success1Home": prev.success1Home,
                                        "fail1Home": prev.fail1Home,
                                        "success1Away": prev.success1Away,
                                        "fail1Away": prev.fail1Away,
                                        "prev2": prev.prev2,
                                        "prev2quotaPerc": prev.prev2quotaPerc,
                                        "prev2historyprob": prev.prev2historyprob,
                                        "success2Home": prev.success2Home,
                                        "fail2Home": prev.fail2Home,
                                        "success2Away": prev.success2Away,
                                        "fail2Away": prev.fail2Away,
                                        "prev3": prev.prev3,
                                        "prev3quotaPerc": prev.prev3quotaPerc,
                                        "prev3historyprob": prev.prev3historyprob,
                                        "success3Home": prev.success3Home,
                                        "fail3Home": prev.fail3Home,
                                        "success3Away": prev.success3Away,
                                        "fail3Away": prev.fail3Away,
                                        "prev4": prev.prev4,
                                        "prev4quotaPerc": prev.prev4quotaPerc,
                                        "prev4historyprob": prev.prev4historyprob,
                                        "success4Home": prev.success4Home,
                                        "fail4Home": prev.fail4Home,
                                        "success4Away": prev.success4Away,
                                        "fail4Away": prev.fail4Away,

                                        "prev5": prev.prev5,
                                        "prev5quotaPerc": prev.prev5quotaPerc,
                                        "prev5historyprob": prev.prev5historyprob,
                                        "success5Home": prev.success5Home,
                                        "fail5Home": prev.fail5Home,
                                        "success5Away": prev.success5Away,
                                        "fail5Away": prev.fail5Away,

                                        "prev6": prev.prev6,
                                        "prev6quotaPerc": prev.prev6quotaPerc,
                                        "prev6historyprob": prev.prev6historyprob,
                                        "success6Home": prev.success6Home,
                                        "fail6Home": prev.fail6Home,
                                        "success6Away": prev.success6Away,
                                        "fail6Away": prev.fail6Away,
                                        

                                    }
                                    return retobj;
                                })

                                setCurrPrevisions(mergedpreperc)
                            })
                        })
                    })
                })
            })
        })
    }

    const salva = () => {
        if (selectedDate != undefined) {
            selectedDate.setHours(12);
            let formattedDate = selectedDate.toISOString().split('T')[0] + "_new"
            setLoading(true)
            FixtureAPI.savePrevisionDayInDate(formattedDate, currPrevisions).then((resp) => {
                setLoading(false)
                let d = resp
            })
        }
    }

    return (
        <div> {loading ? (
            <TailSpin color="red" radius={"8px"} />
        ) :
            <Container>
                <Row>
                    <Column>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Date"
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "blue",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                            onClick={() => getAllChamp()}>
                            Create Prevision
                        </button>
                    </Column>
                </Row>
                {currPrevisions && currPrevisions.length > 0 &&
                    currPrevisions.map((pi, i) => {

                        return <Container style={{ "margin-bottom": "20px" }}>
                            <Row>
                                <Column>
                                    <div className="logoSize"> <img className="logoSize" src={pi.match.teams.home.logo} /></div>
                                </Column>
                                <Column> {pi.match.teams.home.name}</Column>
                                <Column></Column>
                                <Column></Column>
                                <Column> {pi.match.teams.away.name}</Column>
                                <Column>
                                    <div className="logoSize"> <img className="logoSize" src={pi.match.teams.away.logo} /></div>
                                </Column>
                            </Row>

                            {pi.prev1 != undefined && pi.prev1 != "" &&
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column>{pi.prev1}: {pi.prev1quotaPerc}% Hist {pi.prev1historyprob != null ? pi.prev1historyprob.toFixed(2) : 0}%"</Column>
                                        </Row>
                                    </Column>
                                    <Column>
                                        <Row>
                                            <Column>H suc: {pi.success1Home} H fail: {pi.fail1Home} </Column>
                                            <Column>H suc: {pi.success1Away} H fail: {pi.fail1Away} </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            }
                            {pi.prev2 != undefined && pi.prev2 != "" &&
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column>{pi.prev2}: {pi.prev2quotaPerc}% Hist {pi.prev2historyprob != null ? pi.prev2historyprob.toFixed(2) : 0}%"</Column>
                                        </Row>
                                    </Column>
                                    <Column>
                                        <Row>
                                            <Column>H suc: {pi.success2Home} H fail: {pi.fail2Home} </Column>
                                            <Column>H suc: {pi.success2Away} H fail: {pi.fail2Away} </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            } {pi.prev3 != undefined && pi.prev3 != "" &&
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column>{pi.prev3}: {pi.prev3quotaPerc}% Hist {pi.prev3historyprob != null ? pi.prev3historyprob.toFixed(2) : 0}%"</Column>
                                        </Row>
                                    </Column>
                                    <Column>
                                        <Row>
                                            <Column>H suc: {pi.success3Home} H fail: {pi.fail3Home} </Column>
                                            <Column>H suc: {pi.success3Away} H fail: {pi.fail3Away} </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            }
                            {pi.prev4 != undefined && pi.prev4 != "" &&
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column>{pi.prev4}: {pi.prev4quotaPerc}% Hist {pi.prev4historyprob != null ? pi.prev4historyprob.toFixed(2) : 0}%"</Column>
                                        </Row>
                                    </Column>
                                    <Column>
                                        <Row>
                                            <Column>H suc: {pi.success4Home} H fail: {pi.fail4Home} </Column>
                                            <Column>H suc: {pi.success4Away} H fail: {pi.fail4Away} </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            }

                            {pi.prev5 != undefined && pi.prev5 != "" &&
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column>{pi.prev5}: {pi.prev5quotaPerc}% Hist {pi.prev5historyprob != null ? pi.prev5historyprob.toFixed(2) : 0}%"</Column>
                                        </Row>
                                    </Column>
                                    <Column>
                                        <Row>
                                            <Column>H suc: {pi.success5Home} H fail: {pi.fail5Home} </Column>
                                            <Column>H suc: {pi.success5Away} H fail: {pi.fail5Away} </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            } 
                            
                            {pi.prev6 != undefined && pi.prev6 != "" &&
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column>{pi.prev6}: {pi.prev6quotaPerc}% Hist {pi.prev6historyprob != null ? pi.prev6historyprob.toFixed(2) : 0}%"</Column>
                                        </Row>
                                    </Column>
                                    <Column>
                                        <Row>
                                            <Column>H suc: {pi.success6Home} H fail: {pi.fail6Home} </Column>
                                            <Column>H suc: {pi.success6Away} H fail: {pi.fail6Away} </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            }

                        </Container>
                    })}
                <button style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "blue",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                    onClick={() => salva()}>salva</button>
            </Container>
        }
        </div>
    )

}