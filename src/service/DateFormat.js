import dateFormat from "dateformat";

export default function date_format(){
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris'})).toISOString()
}