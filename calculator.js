import {rules} from './rules.js';
export const money=cents=>'HK$'+(cents/100).toLocaleString('en-HK',{minimumFractionDigits:2,maximumFractionDigits:2});
export function parseCents(value){
 const text=String(value).trim();
 if(!/^\d+(?:\.\d{1,2})?$/.test(text))throw new Error('Revenue must be a non-negative amount with at most two decimal places.');
 const [whole,fraction='']=text.split('.');const cents=Number(whole)*100+Number(fraction.padEnd(2,'0'));
 if(!Number.isSafeInteger(cents)||cents>100000000000)throw new Error('Revenue must not exceed HK$1,000,000,000.00.');
 return cents;
}
export function calculate(record){
 const revenueCents=parseCents(record.revenue),text=String(record.quality).trim(),quality=Number(text);
 if(!/^\d+(?:\.\d)?$/.test(text)||quality<0||quality>100)throw new Error('Quality must be 0–100 with at most one decimal place.');
 let rate=0,reason;
 if(quality<rules.qualityMinimum)reason='Quality score below 90.';
 else if(revenueCents<rules.minimumCents)reason='Eligible revenue below HK$100,000.00.';
 else {rate=revenueCents>=rules.higherTierCents?rules.higherPercent:rules.standardPercent;reason=`${money(revenueCents)} × ${rate}%`;}
 const bonusCents=Math.floor((revenueCents*rate+50)/100);
 return {...record,revenueCents,quality,rate,eligible:rate>0,bonusCents,reason};
}
export function csvCell(value){let text=String(value??'');if(typeof value==='string'&&(/^[\s\uFEFF]*[=+@-]/u.test(text)||/^[\t\r\n]/u.test(text)))text="'"+text;return '"'+text.replaceAll('"','""')+'"';}
export function makeCSV(results){const rows=[['Fictional demonstration data','Period','Rule version','Employee ID','First name','Eligible revenue (HKD)','Quality','Eligible','Rate (%)','Bonus (HKD)','Explanation']];for(const r of results)rows.push(['Fictional demonstration data',rules.period,rules.version,r.id,r.name,(r.revenueCents/100).toFixed(2),r.quality,r.eligible?'Yes':'No',r.rate,(r.bonusCents/100).toFixed(2),r.reason]);rows.push(['TOTAL',rules.period,rules.version,'','','','','','',(results.reduce((s,r)=>s+r.bonusCents,0)/100).toFixed(2),'Sum of individually rounded bonuses']);return '\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n');}
